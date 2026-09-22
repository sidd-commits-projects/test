// Voice Chat WebRTC Mesh Logic
let localStream = null;
let peers = {}; // socketId -> RTCPeerConnection
let isVoiceActive = false;
let isMuted = false;

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const btnToggleVoice = document.getElementById('btnToggleVoice');
  if (!btnToggleVoice) return;

  btnToggleVoice.addEventListener('click', async () => {
    if (!isVoiceActive) {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        isVoiceActive = true;
        btnToggleVoice.innerHTML = '🔇 <span>Mute</span>';
        btnToggleVoice.classList.add('active');
        
        // Notify others
        if (typeof gameState !== 'undefined' && gameState.roomCode) {
          socket.emit('join_voice', { roomCode: gameState.roomCode });
        }
      } catch (err) {
        console.error("Error accessing microphone", err);
        alert("Microphone access denied or unavailable.");
      }
    } else {
      // Toggle Mute
      isMuted = !isMuted;
      localStream.getAudioTracks()[0].enabled = !isMuted;
      btnToggleVoice.innerHTML = isMuted ? '🔊 <span>Unmute</span>' : '🔇 <span>Mute</span>';
      if(isMuted) btnToggleVoice.classList.remove('active');
      else btnToggleVoice.classList.add('active');
    }
  });
});

// When a new user joins voice, create an offer
socket.on('user_joined_voice', async ({ socketId }) => {
  if (!isVoiceActive) return; // Ignore if we aren't in voice
  
  const peer = createPeerConnection(socketId);
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  
  socket.emit('webrtc_signal', {
    roomCode: typeof gameState !== 'undefined' ? gameState.roomCode : '',
    targetId: socketId,
    signalData: { type: 'offer', offer }
  });
});

// Handle incoming signals
socket.on('webrtc_signal', async ({ senderId, signalData }) => {
  if (!isVoiceActive) return;

  let peer = peers[senderId];
  
  if (signalData.type === 'offer') {
    if (!peer) peer = createPeerConnection(senderId);
    await peer.setRemoteDescription(new RTCSessionDescription(signalData.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    
    socket.emit('webrtc_signal', {
      roomCode: typeof gameState !== 'undefined' ? gameState.roomCode : '',
      targetId: senderId,
      signalData: { type: 'answer', answer }
    });
  } 
  else if (signalData.type === 'answer') {
    if (peer) {
      await peer.setRemoteDescription(new RTCSessionDescription(signalData.answer));
    }
  } 
  else if (signalData.type === 'ice-candidate') {
    if (peer && signalData.candidate) {
      await peer.addIceCandidate(new RTCIceCandidate(signalData.candidate));
    }
  }
});

function createPeerConnection(peerSocketId) {
  const peer = new RTCPeerConnection(configuration);
  peers[peerSocketId] = peer;

  // Add our local tracks to the connection
  localStream.getTracks().forEach(track => {
    peer.addTrack(track, localStream);
  });

  // Handle ICE candidates
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('webrtc_signal', {
        roomCode: typeof gameState !== 'undefined' ? gameState.roomCode : '',
        targetId: peerSocketId,
        signalData: { type: 'ice-candidate', candidate: event.candidate }
      });
    }
  };

  // Receive remote tracks
  peer.ontrack = (event) => {
    let audioEl = document.getElementById(`audio-${peerSocketId}`);
    if (!audioEl) {
      audioEl = document.createElement('audio');
      audioEl.id = `audio-${peerSocketId}`;
      audioEl.autoplay = true;
      document.body.appendChild(audioEl);
    }
    audioEl.srcObject = event.streams[0];
  };
  
  peer.onconnectionstatechange = () => {
    if (peer.connectionState === 'disconnected' || peer.connectionState === 'failed') {
      const audioEl = document.getElementById(`audio-${peerSocketId}`);
      if (audioEl) audioEl.remove();
      delete peers[peerSocketId];
    }
  };

  return peer;
}

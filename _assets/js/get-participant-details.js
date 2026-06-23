// stub — returns empty credentials so the plugin doesn't throw
async function getParticipantCredentials() {
  return { credentialsObj: {}, exerciseList: [] };
}

function parseCredential(full) { return full; }
function parseExercise(full) { return full; }

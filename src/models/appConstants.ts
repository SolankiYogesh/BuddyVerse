export const isStaging = false;

const appConstants = {
  appName: 'greenlync',
  thejoint: 'TheJoint',
  memes: 'Memes',
  moments: 'Moments',
  greentalk: 'greenTalk',
  like: 'like',
  share: 'share',
  cameraView: 'cameraView',
  feedMediaImage: 'image',
  feedMediaVideo: 'video',
  thumbImage: 'https://d1c70unjid1vm2.cloudfront.net/public/',

  // please dont change below variable value
  APIGreenTalk: isStaging ? 'greentalk_stage' : 'greentalk',
  APIMoments: isStaging ? 'moments_stage' : 'moments',
  APIMemes: isStaging ? 'memes_stage' : 'memes',
  APITheJoint: isStaging ? 'thejoint_stage' : 'thejoint',
  APIPuffPuffPass: isStaging ? 'puff_puff_pass_stag' : 'puff_puff_pass',
};

export default appConstants;

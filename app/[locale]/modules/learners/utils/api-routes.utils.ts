import { BASE_URL } from '../../../shared/constants';

export const LEARNER_API_ROUTES = {
  GET_ALL_LEARNERS: `${BASE_URL}/<example>`,

  GET_ALL_LANGUAGE: `${BASE_URL}/language-pairs/source-languages`,
  GET_LANGUAGE_PAIR: `${BASE_URL}/language-pairs/source-language-locale`,

  GET_ALL_HELEN_SPEAKING: `${BASE_URL}/videos/get-all`,
  HELEN_SPEAKING: `${BASE_URL}/videos`,

  GET_ALL_HELEN_SPEAKING_CATEGORY: `${BASE_URL}/videos/category/get-all`,
  HELEN_SPEAKING_CATEGORY: `${BASE_URL}/videos/category`,

  GET_ALL_HELEN_SPEAKING_TAG: `${BASE_URL}/videos/tag/get-all`,
  HELEN_SPEAKING_TAG: `${BASE_URL}/videos/tag`,

  GET_ALL_HELEN_SPEAKING_CHANNEL: `${BASE_URL}/videos/channels`,
  GET_ALL_HELEN_SPEAKING_CHANNEL_VIDEO: `${BASE_URL}/videos/get-all-for-learners`,

  GET_YOUTUBE_SUB: `${BASE_URL}/youtube-subtitles/get-all-by-media-url`,
  GET_WORD: `${BASE_URL}/word/get-word`,
  POST_VIDEO_VOCAB_WORDS: `${BASE_URL}/videos/words`,
  POST_VIDEO_RECOMMEND: `${BASE_URL}/videos/get-recommend`,

  GET_ALL_HELEN_SPEAKING_AUDIO: `${BASE_URL}/audio/channels`,
  POST_ALL_HELEN_SPEAKING_AUDIO_LIST_BY_ID: `${BASE_URL}/audio/get-all`,
  GET_AUDIO_DETAILD_BY_ID: `${BASE_URL}/audio/audio-id`,

  POST_DICTATION_CHECK: `${BASE_URL}/support/text-diff`,
};

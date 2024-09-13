import { ConvertedSub, Sub } from '../types';

function splitSentenceIntoWords(sentence: string): string[] {
  // Using a regular expression to split the sentence into words
  // const words = sentence.split(/(\s+|[,.!?:"]+|'(?=\w)|(?<=\w)')/);
  const words = sentence.match(/\b\w+(?:'\w+)?\b|[^\w\s]+|\s+/g);
  return words || [];
}

export function processSubtitles(sentences: Sub[]): ConvertedSub[] {
  return sentences.map((sentence) => {
    return {
      ...sentence,
      text: splitSentenceIntoWords(sentence.text),
    };
  });
}

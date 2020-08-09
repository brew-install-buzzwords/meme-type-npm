import { emojis, Emoji } from "./emojis";
import {
  numbers,
  bigLetters,
  symbols,
  homophones,
  emojifyDefaults,
  femaleModifier,
  maleModifier,
} from "./constants";

export type L33t1fySubstitution = "numbers" | "big" | "symbols" | "homophones";

export interface L33t1fyOptions {
  /** types of l33t1fy substitutions */
  substitutionType: L33t1fySubstitution;
}

export type FitzpatrickModifier = "🏻" | "🏼" | "🏽" | "🏾" | "🏿";

export interface ClapifyOptions {
  fitzpatrick: FitzpatrickModifier;
}

export interface EmojifyOptions {
  fitzpatrick: FitzpatrickModifier;
}

const emojifyValues = Object.values(emojis).filter((x) => x.category !== "flags");

/**
 * Transforms text to be all caps with clap emojis between each word
 * @param text the text to be transformed
 * @returns the text with clap emojis
 */
export function clapify(text: string, options: ClapifyOptions): string {
  const arr: string[] = text
  ?.toUpperCase()
  .split(/(\s+)/)
  .filter((e) => e.trim().length > 0);
  const clapEmoji = applyFitzpatrick(emojis.clap, options?.fitzpatrick);
  
  return arr?.length ? arr.join(` ${clapEmoji} `) : "";
}

/**
 * Transforms text to have alternating capitalization
 * @param text the text to be transformed
 * @returns the text with alternating capitalization
 */
export function altCapify(text: string): string {
  const arr = text.split("");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i % 2 ? arr[i].toUpperCase() : arr[i].toLowerCase();
  }
  
  return arr.join("");
}

/**
 * Applies fitzpatrick modifier to an emoji
 * @param emoji the emoji to modify
 * @param modifier the fitzpatrick modifier
 * @returns the modified emoji character
 */
export function applyFitzpatrick(emoji: Emoji, modifier: FitzpatrickModifier): string {
  if (emoji.fitzpatrick_scale && modifier) {
    // move female modifier to end for proper unicode ordering
    // more info here: https://unicode.org/emoji/charts/emoji-zwj-sequences.html
    if (emoji.char.includes(femaleModifier)) {
      return emoji.char.replace(femaleModifier,'') + modifier + femaleModifier;
    }

    // move male modifier to end for proper unicode ordering
    if (emoji.char.includes(maleModifier)) {
      return emoji.char.replace(maleModifier,'') + modifier + maleModifier;
    }

    return emoji.char + modifier;
  }

  return emoji.char;
}

/**
 * Inserts emojis into text
 * @param text the source text
 * @returns the text with emojis
 */
export function emojify(text: string, options: EmojifyOptions): string {
  const textArr = text.split(/(\s+)/).filter((e) => e.trim().length > 0);
  const newTextArr: string[] = [];
  
  textArr.forEach((x) => {
    newTextArr.push(x);
    const searchText = x.replace(/[^a-zA-Z ]/g, "").toLowerCase();
    // first, look for exact match
    const match = emojis[searchText];
    if (match) {
      newTextArr.push(applyFitzpatrick(match, options?.fitzpatrick));
    } else {
      // second, look for keywords
      const filteredEmojis = emojifyValues.filter((y) =>
      y.keywords?.includes(searchText)
      );
      if (filteredEmojis.length) {
        const keywordEmoji =
        filteredEmojis[Math.floor(Math.random() * filteredEmojis.length)];
        newTextArr.push(applyFitzpatrick(keywordEmoji, options?.fitzpatrick));
      } else {
        // third, randomly select among common emojis
        const emojiCount = Math.random() * 6 - 2;
        if (emojiCount > 0) {
          const randomEmoji =
          emojifyDefaults[Math.floor(Math.random() * emojifyDefaults.length)];
          const randomEmojiFitzpatrick = applyFitzpatrick(
            randomEmoji,
            options?.fitzpatrick
            );
            newTextArr.push(randomEmojiFitzpatrick.repeat(emojiCount));
        }
      }
    }
  });

  return newTextArr.join(" ");
}
  
/**
 * Translates text into keyboard smashing
 * @param text the text to be translated
 * @returns the generated keysmash text
 */
export function smashify(text: string): string {
  const leftHandKeys = ["a", "s", "d", "f", "g"];
  const rightHandKeys = ["h", "j", "k", "l", ";"];
  const chars = [];
  const startingChars = ["a", "s", "d", "f"];
  let hand = leftHandKeys;
  for (let i = 0; i < text.length; i++) {
    // 75% chance to short-circtuit with common starting keys
    if (i < startingChars.length && Math.random() > 0.25) {
      chars.push(startingChars[i]);
      continue;
    }
    const c = text[i];
    if (c.trim()) {
      chars.push(hand[Math.floor(Math.random() * hand.length)]);
      if (hand === leftHandKeys) {
        hand = rightHandKeys;
      } else {
        hand = leftHandKeys;
      }
    } else {
      chars.push(c);
    }
  }

  return chars.join("");
}

/**
 * Translates the text into l33t sp34k
 * @param text the text to be translated
 * @param options options
 * @returns the translated text
 */
export function l33t1fy(text: string, options: L33t1fyOptions): string {
  let characterMap: {[key: string]: string} = {};
  let preserveCapitalization = false;
  if (!options?.substitutionType) {
    return "";
  }
  switch (options?.substitutionType) {
    case "numbers":
    characterMap = numbers;
    break;
    case "big":
    characterMap = bigLetters;
    break;
    case "symbols":
    characterMap = symbols;
    break;
    case "homophones":
    characterMap = homophones;
    preserveCapitalization = true;
    break;
  }
  const transformedText: string[] = [];
  text.split("").forEach((c) => {
    // TODO: preserve capitalization for homophones
    transformedText.push(characterMap[c.toLowerCase()] || c);
  });

  return transformedText.join("");
}

/**
 * Text transform for spaced out text
 * @param text the text to be transformed
 * @returns the spaced out text
 */
export function spaceify(text: string): string {
  return text.split("").join(" ");
}
  
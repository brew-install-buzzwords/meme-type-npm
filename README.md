# meme-type-npm

a typescript package for transforming text into internet speak 

## Install

[📦NPM](https://www.npmjs.com/package/meme-type-npm)

`npm i --save meme-type-npm`

## Usage

    > import { altCapify, spaceify, clapify, emojify, l33t1fy, smashify, L33t1fySubstitution } from 'meme-type-npm';

    > const sampleInput = 'this is test input';

    > clapify(sampleInput);
    THIS 👏 IS 👏 TEST 👏 INPUT

    > clapify(sampleInput, { fitzpatrick: '🏾' });
    THIS 👏🏾 IS 👏🏾 TEST 👏🏾 INPUT

    > spaceify(sampleInput);
    t h i s   i s   t e s t   i n p u t

    > altCapify(sampleInput);
    tHiS Is tEsT InPuT

    > emojify(sampleInput);
    this 👀👀 is 🏂🏂🏂 test 📝 input 🔘

    > emojify(sampleInput, { fitzpatrick: '🏻' });
    this 🏃🏻‍♀️🏃🏻‍♀️🏃🏻‍♀️ is  test ⌛ input 🔘

    > l33t1fy(sampleInput, { substitutionType: 'numbers' });
    th15 15 t35t 1n9ut

    > smashify(sampleInput);
    ajdf aj sjaj akfld

## Examples

For example usage, see the angular app [meme-type](https://memetype.brewinstallbuzzwords.com). The Github repository for meme-type is located [here](https://github.com/brew-install-buzzwords/meme-type). For more info, see [this blog post](https://www.brewinstallbuzzwords.com/posts/meme-type/).

## Build

`npm run build`

## Bugs reports and contributions

If you find a bug with this package or would like to suggest a feature, please submit the issue [here]().

This project is open to pull requests from the public. Please wait for feedback on the issue you want to contribute to before creating your pull request.

## Author

This package was created by Adam Davis, founder of the programming blog [brew install buzzwords](https://www.brewinstallbuzzwords.com).

![brew-install-buzzwords banner](https://github.com/brew-install-buzzwords/brew-install-buzzwords/blob/master/post_banner_white-01.png)

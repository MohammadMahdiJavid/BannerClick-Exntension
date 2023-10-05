# BannerClick-Exntension

BannerClick Exntesion

## How to use

1. Current version only works for **CHROME**
2. Download the repository
    1. ```bash
        git clone https://github.com/MohammadMahdiJavid/BannerClick-Exntension.git
       ```
3. Open the Extension Management page by navigating to chrome://extensions.
    1. The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
    2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
    3. Click the LOAD UNPACKED button and select the extension directory.
        1. you should select the dist directory
    4. Ta-da! The extension has been successfully installed.
4. Open the website you want to test **Extension is not highly tested yet, websites below are tested and working**
5. open developer tools
6. open console
7. in the console when you see found banners
8. then it will show you the Banner which is found
    1. it is DOM element
    2. if you click on it, the banner would be come blue on your screen
9. for more information you can see the example below

## Example

1. open Incognito or a browser which doesn't have the consent cookie, so the banner will pop up
2. load the extension into your browser
3. open developer tools and go to console tab
4. go to website you want to test
5. in the console you will see the found banners
6. Example Website
    1. [Netflix](https://www.netflix.com/de-en/)
7. ![Example1](guide/images/1-%20Developer%20Tools.jpg)
8. ![Element on the Page](guide/images/2-%20Found%20Element.jpg)

## Websites to test

1. [Netflix](https://www.netflix.com/de/)

    1. Found Elements
    2. ```javascript
        div.default-ltr-cache-1h3fewl.e1yb99j90
       ```

2. [Instagram](https://www.instagram.com/)
    1. Found Elements
    2. ```javascript
       div.x1ja2u2z.x1afcbsf.x1a2a7pz.x6ikm8r.x10wlt62.x71s49j.x6s0dn4.x78zum5
           .xdt5ytf.xl56j7k.x1n2onr6;
       ```
3. [Google](google.de)

    1. Found Elements
    2. ```javascript
            div#CXQnmb.KxvlWc
       ```

4. [Youtube](https://www.youtube.com/)

    1. Found Elements
    2. ```javascript
            div#content.style-scope.ytd-consent-bump-v2-lightbox
       ```

5. [Facebook](https://de.facebook.com/)
    1. Found Elements
    2. ```javascript
       div._59s7._9l2g;
       ```

# **Web-"Logistic"** | **Web-Логістика**

## Web-інтерфейс для АРМ "Логістика" Іллівчівськ (Чорноморськ)

To install preparating (Необхідні інструменти)

```bash
apt-get install node.js
npm install -g gulp # install build system GulpJs
npm install -g npm  # update npm
```

Recommendet versions (Рекомендовані версії)

```bash
## base nodejs (optionally)
node -v
#$ v6.0.0

## recomendet node package manager > 3
npm -v
#$ 3.8.6

##recomendet git > 2
git --version
#git version 2.9.1

## gulp
gulp -v
#$ CLI version 3.9.0
#$ Local version 3.9.1
```

Install (Клонування з git)

```bash
# muss be openvpn
#ssh
    git clone git@10.188.0.100:logistic-web/frontend.gits
#https
    GIT_SSL_NO_VERIFY=true git  clone https://10.188.0.100/logistic-web/frontend.git

# set git config fot https
    git config http.sslVerify false

```

Run localy (Виконати локально)

`npm run lite`

Run task for **build** (Виконання для збірки **build**)

`gulp build`

Run task for **realese** (Виконання для збірки **realese**)

`gulp realese`

Clean directories (Видалення папок із збірками)

```bash
    gulp clean          # delete build/*
    gulp clean-realese  # delete realese/*
```

<!--
Md-tools in vs-Code:
https://confluence.atlassian.com/bitbucketserver/markdown-syntax-guide-776639995.html MarkDown Guide

| Data                               | ShortCut                   |
|------------------------------------|----------------------------|
| Toggle bold                        | Ctrl+B                     |
| Toggle italics                     | Ctrl+I                     |
| Toggle strikethrough               | Alt+S                      |
| Toggle code inline                 | Ctrl+`                     |
| Toggle code block                  | Ctrl+Shift+`               |
| Toggle blockquote                  | Ctrl+Shift+Q               |
| ToUpper                            | Ctrl+Shift+U               |
| ToLower                            | Ctrl+Shift+L               |
| Convert to unordered list          | Ctrl+L, Ctrl+U             |
| Convert to ordered list            | Ctrl+L, Ctrl+O             |
| Convert to link template           | Alt+L                      |
| Convert to image template          | Alt+I                      |
| Format GFM table                   | Ctrl+Shift+T, Ctrl+Shift+F |
| GFM Table: Add column to the left  | Ctrl+Shift+T, Ctrl+Shift+L |
| GFM Table: Add column to the right | Ctrl+Shift+T, Ctrl+Shift+R |
| GFM Table: Add row above           | Ctrl+Shift+T, Ctrl+Shift+A |
| GFM Table: Add row below           | Ctrl+Shift+T, Ctrl+Shift+B |
| GFM Table: Delete row              | Ctrl+Shift+D, Ctrl+Shift+R |
| GFM Table: Delete column           | Ctrl+Shift+D, Ctrl+Shift+C |
-->

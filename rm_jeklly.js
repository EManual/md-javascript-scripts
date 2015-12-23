/**
 * 删除(转换)jekyll的格式到markdown
 */
var fs = require('fs')

var content = fs.readFileSync('./fixtures/a.md', {
        encoding: 'utf-8'
    })
    // var lines = content.split('\n')

/**
 * 去除头信息，例如：
 ---
 title: Ajax
 layout: page
 category: bom
 date: 2013-02-16
 modifiedOn: 2014-02-27
 ---
 */
var rm_header = function(content) {
    var lines = content.split('\n')
    if (lines[0].indexOf('---') !== -1) {
        lines.shift();
        while (lines[0].indexOf('---') === -1) {
            lines.shift()
        }
        if (lines[0].indexOf('---') !== -1) {
            lines.shift()
        }
    }

    return lines.join('\n')
}

var rm_empty_header_line = function(content) {
    var lines = content.split('\n')
    while (lines[0] === '') {
        lines.shift();
    }
    return lines.join('\n')
}

//{% highlight javascript %}
var replace_hightline = function(content) {
    var lines = content.split('\n')
    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(/^{% highlight(.*)%}$/ig, function(m, group) {
            return '```' + group.trim() + '\n'
        })
        lines[i] = lines[i].replace(/^{%\s*endhighlight\s*%}$/ig, '```')
    }

    return lines.join('\n')
}

content = rm_header(content)
content = rm_empty_header_line(content)
console.log(replace_hightline(content))

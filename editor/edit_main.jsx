// edit_main.js
/* globals ajaxGet */
import React from 'react'
import ReactDOM from 'react-dom'

class CommandList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {flagShow: false}
    this.files = [
      'plugin_browser.js',
      'plugin_turtle.js',
      'plugin_system.js'
    ]
    this.listItems = []
  }

  render () {
    let items = []
    if (this.state.flagShow) {
      items = this.listItems
    }
    const frameStyle = {
      paddingTop: '8px'
    }
    const frame = (
      <div>
        <div style={frameStyle}>
          <button id='cmd_button' onClick={this.clickShow.bind(this)}>命令表示</button>
        </div>
        <div>
          <ul>{items}</ul>
        </div>
      </div>
    )
    return frame
  }

  componentDidMount () {
    ajaxGet('../release/command.json', {}, (text, xhr) => {
      const listItems = []
      const cmd = JSON.parse(text)
      const groupStyle = {'color': 'gray'}
      const itemStyle = {}
      for (let i = 0; i < this.files.length; i++) {
        const fname = this.files[i]
        const glist = cmd[fname]
        if (!glist) continue // 読み込みに失敗した場合
        for (const groupName in glist) {
          const gid = 'key_' + groupName
          listItems.push(<li key={gid} style={groupStyle}>{groupName}</li>)
          const group = glist[groupName]
          const a = []
          for (const g in group) {
            const c = group[g]
            const cType = c[0]
            const cName = c[1]
            const cArgs = String(c[2] + '/').split('/')[0]
            let paste = cName
            if (cType === '関数') {
              paste = cArgs + cName + '。'
            }
            const nodeId = 'key_' + cName
            a.push((
              <span key={nodeId} onClick={this.clickCommand} style={itemStyle} data-paste={paste}>[{cName}]&nbsp;</span>
            ))
          }
          const gidLI = gid + '_li'
          listItems.push(<li key={gidLI}>{a}</li>)
        }
      }
      this.listItems = listItems
    })
  }

  clickCommand (e) {
    if (!e.target) return
    const paste = e.target.getAttribute('data-paste')
    console.log(paste)
    const txt = document.getElementById('src_box')
    const org = txt.value
    const cur = txt.selectionStart
    const left = org.substr(0, cur)
    const right = org.substr(cur)
    txt.value = left + paste + right
    txt.focus()
  }

  clickShow (e) {
    const b = !this.state.flagShow
    this.setState({'flagShow': b})
    const btn = document.getElementById('cmd_button')
    const s = (b) ? '命令隠す' : '命令表示'
    ReactDOM.render(<span>{s}</span>, btn)
  }
}

function showCommandList () {
  // render
  ReactDOM.render(
    <CommandList />,
    document.getElementById('command-list'))
}

setTimeout(() => {
  showCommandList()
}, 100)
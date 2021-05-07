import React from 'react'
import './styles/index.scss'
import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Input from './components/Input/input'
import AutoComplete from './components/AutoComplete/autoComplete'
import Progress from './components/Progress/progress'
import Upload from './components/Upload/upload'
import Icon from './components/Icon/icon'
import Alert from './components/Alert/alert'

function App() {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items)
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <Button>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href='https://www.baidu.com'>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} disabled={true} href='https://www.baidu.com'>
          Hello
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <Menu
          defaultIndex='0'
          onSelect={(index) => {
            alert(`clicked ${index} item`)
          }}
          mode="vertical"
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>cool link 2</MenuItem>
          <SubMenu title='111'>
            <MenuItem>cool link111</MenuItem>
          </SubMenu>
        </Menu>
        <Input style={{ width: 200 }} />
        <AutoComplete
          fetchSuggestions={handleFetch}
          onSelect={() => console.log('selected')}
          //renderOption={renderOption}
        />
        <Progress percent={45} />
        <Upload
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          name='fileName'
          multiple
          drag
        >
          <Icon icon='upload' size='5x' theme='secondary' />
          <br />
          <p>Drag file over to upload</p>
        </Upload>
        <Alert closeText='111' message="jsChen" description="sdsdsdsdsdsd" closeable showIcon/>
      </header>
    </div>
  )
}

export default App

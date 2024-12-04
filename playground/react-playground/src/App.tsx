
import './App.css'

function App() {
  const list = {}

  return (
    <>
      测试React日志
      {
        list.map(item=>{
          return <div key={item}>{item}</div>
        })
      }
      {
        list.map(item=>{
          return <div key={item}>{item}</div>
        })
      }
      {
        list.map(item=>{
          return <div key={item}>{item}</div>
        })
      }
      {
        list.map(item=>{
          return <div key={item}>{item}</div>
        })
      }
    </>
  )
}

export default App

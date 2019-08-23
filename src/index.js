
import EX1 from './example/ex1'
import EX2 from './example/ex2'
import EX3 from './example/ex3'
import EX4 from './example/ex4'
import EX5 from './example/ex5'
import EX6 from './example/ex6'
import EX7 from './example/ex7'
import EX8 from './example/ex8'
import EX9 from './example/ex9'
import EX10 from './example/ex10'
import EX11 from './example/ex11'
import EX12 from './example/ex12'

const exMap = {
  EX1,
  EX2,
  EX3,
  EX4,
  EX5,
  EX6,
  EX7,
  EX8,
  EX9,
  EX10,
  EX11,
  EX12
}

const search = (function () {
  let json = {}
  if (location.search) {
    location.search.slice(1).split('&').map(item => {
      let arr = item.split('=')
      json[arr[0]] = arr[1]
    })
    return json
  }
  return json
})()

let ex = search.ex || 'EX12'

exMap[ex]()

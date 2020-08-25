import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom'

import Cart from './views/Cart'
import Home from './views/Home'
import My from './views/My'
import Menu from './views/Menu'

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from './reducer'

import style from './assets/style/navigation.module.scss'

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <div className={style.navigation}>
            <Link to='/'>Home</Link>
            <Link to='/menu'>Menu</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/my'>My</Link>
          </div>
          <Route path='/' exact component={Home} />
          <Route path='/menu' exact component={Menu} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/my' exact component={My} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

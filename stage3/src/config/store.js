import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';

import stage from '../reducers/stage';
import  comments from '../reducers/comments';

const reducer = combineReducers({ stage, comments });

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  enhancer = compose(
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Hook for Redux DevTools Extension. see https://github.com/zalmoxisus/redux-devtools-extension
  )
}

//初始化state
let imageDatas = require('json-loader!../data/imageData.json');
let imgArrangeArr = [];
let localComments = window.localStorage.getItem('comments');
import { comments as initComments } from '../data/comments';
const commetsData = localComments ? JSON.parse(localComments) : initComments;


imageDatas.forEach((image, index) => {
  image.imageUrl = require('../images/' + image.name);
  imgArrangeArr.push({
    id: index,
    pos: {
      left: 0,
      right: 0
    },
    rotate: 0,
    isInverse: false,
    isCenter: false
  });
});

const defaultState = {
  stage: {
    imageDatas,
    imgArrangeArr
  },
  comments: commetsData
}


export default createStore(reducer, defaultState, enhancer);
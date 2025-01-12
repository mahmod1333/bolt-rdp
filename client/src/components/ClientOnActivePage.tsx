import React, { useEffect, useRef, useState } from 'react'
    import { useLocation } from 'react-router-dom'
    import './ClientOnActivePage.css'
    import io from 'socket.io-client'
    import { keysKeyboardControler } from '../utils/Controles.Keyboard'
    import { keybord_ar } from '../utils/keybord_ar'
    import { keybord_en } from '../utils/keybord_en'
    import { showKeybordBtnhandler } from '../utils/virtualkeyboard'
    import { handelmousemove, handelmouseClick, handelTouchStart, handelTouchMove, handelTouchEnd } from '../utils/mouseControler'
    import { useDispatch, useSelector } from 'react-redux'
    import { setConnected, setRoomId } from '../store/slices/connectionSlice'
    import { setLangType, setScreenData, setKeyboardInput } from '../store/slices/screenSlice'
    import { IconButton, Typography, Box, Alert } from '@mui/material'
    import KeyboardIcon from '@mui/icons-material/Keyboard';
    import MouseIcon from '@mui/icons-material/Mouse';
    import UploadIcon from '@mui/icons-material/Upload';
    import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

    const socket = io('http://localhost:9000')

    function ClientOnActivePage() {
      const location = useLocation()
      const videoRemote = useRef(null)
      const [hideShow, setHideShow] = useState(false)
      const [doubletouch, setDoubleTouch] = useState(false)
      const [checkD, setCheckD] = useState(false)
      const [clickLR, setClickLR] = useState('left')
      const [checkClickLR, setCheckClickLR] = useState(false)
      const [timer, setTimer] = useState(null)
      const [lang, setLang] = useState('ar')
      const dispatch = useDispatch()
      const roomId = useSelector((state) => state.connection.roomId)

      useEffect(() => {
        if (roomId) {
          socket.emit('join-message', roomId)
          socket.emit('start-conn', roomId)
        }
      }, [roomId])

      useEffect(() => {
        if (videoRemote.current) {
          videoRemote.current.addEventListener('mousemove', (e) => handelmousemove(e, videoRemote.current, roomId, socket))
          videoRemote.current.addEventListener('click', () => handelmouseClick(roomId, socket))
          videoRemote.current.addEventListener('touchstart', (e) => handelTouchStart(e, videoRemote.current, roomId, socket, setDoubleTouch, setCheckD, setClickLR, setTimer))
          videoRemote.current.addEventListener('touchmove', (e) => handelTouchMove(e, videoRemote.current, roomId, socket))
          videoRemote.current.addEventListener('touchend', (e) => handelTouchEnd(e, videoRemote.current, roomId, socket, setCheckClickLR, setTimer, clickLR))
        }
      }, [roomId])

      useEffect(() => {
        socket.on('screen-data', (data) => {
          dispatch(setScreenData(data))
          if (videoRemote.current) {
            videoRemote.current.src = data
          }
        })
        socket.on('type', (data) => {
          dispatch(setKeyboardInput(data))
        })
        socket.on('lang-type', (data) => {
          dispatch(setLangType(data))
          setLang(data.lang)
        })
      }, [socket, dispatch])

      const togglePopup = (message) => {
        const messageDiv = document.querySelector('.message')
        messageDiv.innerHTML = message
        messageDiv.style.display = messageDiv.style.display === 'none' ? 'block' : 'none'
      }

      useEffect(() => {
        if (roomId) {
          togglePopup('<p>Wait to get the PC</p>')
          togglePopup('done')
        }
      }, [roomId])

      const handleShowHide = () => {
        setHideShow(!hideShow)
        const header = document.querySelector('.c-act-header')
        const img = document.querySelector('#show-hide-img')
        if (!hideShow) {
          header.style.margin = '-60px 0px'
          img.src = '/src/img/down.png'
        } else {
          header.style.margin = '0px 0px'
          img.src = '/src/img/upload.png'
        }
      }

      return (
        <div className="c-act-container">
          <div className="c-act-header">
            <div className="controls">
              <p>|</p>
              <div className="content">
                <IconButton>
                  <MouseIcon id="act-mouse" />
                </IconButton>
                <IconButton onClick={() => showKeybordBtnhandler(setLang, lang, socket, roomId)}>
                  <KeyboardIcon id="act-keyboard" />
                </IconButton>
              </div>
              <p>|</p>
            </div>
            <div id="show-hide" onClick={handleShowHide}>
              <IconButton>
                {hideShow ? <ArrowDownwardIcon id="show-hide-img" /> : <UploadIcon id="show-hide-img" />}
              </IconButton>
            </div>
          </div>
          <div className="c-act-body">
            <div className="vde">
              <video id="remote-video" ref={videoRemote} autoPlay></video>
            </div>
          </div>
          <div className="message">
            <div onClick={() => togglePopup()} className="close-btn">
              ×
            </div>
            <img className="load_img" src="/src/img/image_processing20210903-9493-4e9y74.gif" alt="loading" />
            <p>Wait to get the PC</p>
          </div>
          <div className="keyboard_wrapp">
            <div className="keyboard_lights"></div>
            <div className="keyboard_keys"></div>
          </div>
        </div>
      )
    }

    export default ClientOnActivePage

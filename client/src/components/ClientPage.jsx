import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import './ClientPage.css'
    import io from 'socket.io-client'
    import { useDispatch } from 'react-redux'
    import { setRoomId } from '../store/slices/connectionSlice'
    import { TextField, Button, Alert } from '@mui/material'

    const socket = io('http://localhost:9000')

    function ClientPage() {
      const [room, setRoom] = useState('')
      const navigate = useNavigate()
      const dispatch = useDispatch()

      const handleRoomChange = (e) => {
        setRoom(e.target.value)
      }

      const handleGoClick = async () => {
        if (room) {
          try {
            const response = await fetch(`http://localhost:1234/server?room=${room}`)
            if (response.ok) {
              dispatch(setRoomId(room))
              navigate(`/ClientOnActivePage?room=${room}`)
            } else {
              alert('Room not found')
            }
          } catch (error) {
            alert('Error connecting to server')
          }
        } else {
          alert('input is empty')
        }
      }

      return (
        <div className="app-container">
          <div className="app-header">
            <p>Tamkeen app </p>
          </div>
          <div className="app-body">
            <div className="app-form">
              <TextField
                label="Room ID"
                variant="outlined"
                id="room-input"
                onChange={handleRoomChange}
              />
              <Button variant="contained" id="Go" onClick={handleGoClick}>
                Go
              </Button>
            </div>
            <video id="screenshared-video" className="local-video" hidden></video>
            <video id="remote-video" hidden></video>
          </div>
          <Alert severity="info" id="notification" hidden>
            
          </Alert>
        </div>
      )
    }

    export default ClientPage

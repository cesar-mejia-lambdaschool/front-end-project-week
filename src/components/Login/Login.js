import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { fetchNotes } from '../../actions'
import './Login.css'

// const serverURL = 'https://lambda-notes-server.herokuapp.com'
const serverURL = 'https://lambda-notes-apiserver.herokuapp.com'

class Login extends React.Component {
  state = {
    loading: false
  }
  componentDidMount () {
    var canvas = document.querySelector('canvas')
    var c = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    var particleCount = 750
    var mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }

    window.addEventListener('mousemove', function (event) {
      mouse.x = event.clientX - canvas.width / 2
      mouse.y = event.clientY - canvas.height / 2
    })

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      lightParticles = []
      initializeParticles()
    })

    function LightParticle (x, y, radius, color) {
      this.x = x
      this.y = y
      this.radius = radius
      this.color = color

      this.update = function () {
        this.draw()
      }

      this.draw = function () {
        c.save()
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.shadowColor = this.color
        c.shadowBlur = 15
        c.shadowOffsetX = 0
        c.shadowOffsetY = 0
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
      }
    }

    var lightParticles = []

    var timer = 0
    var opacity = 1
    var speed = 0.0005
    var colors = ['#0952BD', '#A5BFF0', '#118CD6', '#1AAEE8', '#F2E8C9']

    var initializeParticles
    ;(initializeParticles = function () {
      for (var i = 0; i < particleCount; i++) {
        var randomColorIndex = Math.floor(Math.random() * 6)
        var randomRadius = Math.random() * 2

        // Ensure particles are spawned past screen width and height so
        // there will be no missing stars when rotating canvas
        var x = Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2
        var y = Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2
        lightParticles.push(
          new LightParticle(x, y, randomRadius, colors[randomColorIndex])
        )
      }
    })()

    function animate () {
      window.requestAnimationFrame(animate)

      c.save()
      if (isMouseDown === true) {
        // Ease into the new opacity
        var desiredOpacity = 0.01
        opacity += (desiredOpacity - opacity) * 0.03
        c.fillStyle = 'rgba(18, 18, 18,' + opacity + ')'

        // Ease into the new speed
        var desiredSpeed = 0.012
        speed += (desiredSpeed - speed) * 0.01
        timer += speed
      } else {
        // Ease back to the original opacity
        var originalOpacity = 1
        opacity += (originalOpacity - opacity) * 0.01
        c.fillStyle = 'rgba(18, 18, 18, ' + opacity + ')'

        // Ease back to the original speed
        var originalSpeed = 0.001
        speed += (originalSpeed - speed) * 0.01
        timer += speed
      }

      c.fillRect(0, 0, canvas.width, canvas.height)
      c.translate(canvas.width / 2, canvas.height / 2)
      c.rotate(timer)

      for (var i = 0; i < lightParticles.length; i++) {
        lightParticles[i].update()
      }

      c.restore()
    }

    var isMouseDown = false

    window.addEventListener('mousedown', function () {
      isMouseDown = true
    })

    window.addEventListener('mouseup', function () {
      isMouseDown = false
    })

    animate()
  }

  renderField (field) {
    let dangerBorder = field.meta.touched && field.meta.error
      ? 'dangerBorder'
      : ''

    let dangerText = field.meta.touched && field.meta.error ? 'dangerText' : ''

    return (
      <div className={`form-group`}>
        <label style={{fontWeight: 'bold'}}>{field.label}</label>
        <input
          className={`form-control ${dangerBorder}`}
          type={field.type}
          {...field.input}
        />
        <div className={`text-help ${dangerText}`}>
          {field.meta.touched ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div className='Login'>
        <canvas />
        <form
          className='LoginForm'
          onSubmit={handleSubmit(this.onSubmit)}
          style={{ width: '400px', padding: '20px' }}
        >
          <Link
            style={{ textDecoration: 'none !important', color: '#111' }}
            to='/'
          >
            <h1>Lambda Notes</h1>
          </Link>
          <h2>Login:</h2>
          <Field
            label='Username'
            name='username'
            type='text'
            component={this.renderField}
          />
          <Field
            label='Password'
            name='password'
            type='password'
            component={this.renderField}
          />
          <button
            type='submit'
            style={{ marginLeft: '140px' }}
            className='btn btn-primary'
          >
            Submit
          </button>
          <h5 style={{ marginTop: '20px' }}>
            {this.state.loading && 'Loading page ...Please Wait.'}
          </h5>
        </form>
      </div>
    )
  }

  onSubmit = user => {
    this.setState({ loading: true })
    axios
      .post(`${serverURL}/api/login`, user)
      .then(response => {
        localStorage.setItem('authorization', `Bearer ${response.data.token}`)
        console.log('in first then')
      })
      .then(x => {
        this.props.history.push('/')
        console.log('in 3rd then')
      })
      .catch(err => {
        console.log('ERROR You are not authorized', err)
      })
  }
}

const validate = values => {
  const { username, password } = values
  const errors = {}
  if (!username || username.length < 3 || username.length > 20) {
    errors.username = 'Enter a username that is between 3 and 20 characters.'
  }
  if (!password || password.length < 3 || password.length > 20) {
    errors.password = 'Enter a password that is between 3 and 20 characters.'
  }

  return errors
}

export default reduxForm({ validate, form: 'LoginForm' })(
  connect(null, { fetchNotes })(Login)
)

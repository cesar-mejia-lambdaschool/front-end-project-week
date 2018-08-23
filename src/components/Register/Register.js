import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { fetchNotes } from '../../actions'
import './Register.css'

// const serverURL = 'https://lambda-notes-server.herokuapp.com'
const serverURL = 'https://lambda-notes-apiserver.herokuapp.com'

class Register extends React.Component {
  state = {
    loading: false
  }
  renderField (field) {
    let dangerBorder = field.meta.touched && field.meta.error
      ? 'dangerBorder'
      : ''

    let dangerText = field.meta.touched && field.meta.error ? 'dangerText' : ''

    return (
      <div className={`form-group`}>
        <label style={{ fontWeight: 'bold' }}>{field.label}</label>
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

  componentDidMount () {
    const canvas = document.getElementById('myCanvas')
    const c = canvas.getContext('2d')

    let mouseX
    let mouseY

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    const maxRadius = 35

    canvas.onmousemove = function (e) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    function Circle (xCoordinate, yCoordinate, radius) {
      const randomNumber = Math.floor(Math.random() * 4)
      const randomTrueOrFalse = Math.floor(Math.random() * 2)

      this.xCoordinate = xCoordinate
      this.yCoordinate = yCoordinate
      this.radius = radius
      this.color = colorArray[randomNumber]

      if (randomTrueOrFalse == 1) {
        this.xVelocity = -Math.random() * 1
      } else {
        this.xVelocity = Math.random() * 1
      }

      if (randomTrueOrFalse == 1) {
        this.yVelocity = -Math.random() * 1
      } else {
        this.yVelocity = Math.random() * 1
      }

      // As distance gets closer to 0, increase radius

      this.update = function () {
        this.xCoordinate += this.xVelocity
        const xDistance = mouseX - this.xCoordinate
        const yDistance = mouseY - this.yCoordinate
        const originalRadius = radius
        this.yCoordinate += this.yVelocity

        // Movement Functions
        if (
          this.xCoordinate + this.radius > canvasWidth ||
          this.xCoordinate - this.radius < 0
        ) {
          this.xVelocity = -this.xVelocity
        }
        if (
          this.yCoordinate + this.radius > canvasHeight ||
          this.yCoordinate - this.radius < 0
        ) {
          this.yVelocity = -this.yVelocity
        }

        // Radius Decrease Functions
        // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
        if (
          xDistance < 50 &&
          xDistance > -50 &&
          this.radius < maxRadius &&
          yDistance < 50 &&
          yDistance > -50
        ) {
          this.radius += 2
        } else if (
          (xDistance >= 50 && originalRadius < this.radius) ||
          (xDistance <= -50 && originalRadius < this.radius) ||
          (yDistance >= 50 && originalRadius < this.radius) ||
          (yDistance <= -50 && originalRadius < this.radius)
        ) {
          this.radius -= 2
        }

        this.draw()
      }

      this.draw = function () {
        c.beginPath()
        c.arc(
          this.xCoordinate,
          this.yCoordinate,
          Math.abs(this.radius),
          0,
          Math.PI * 2
        )
        c.fillStyle = this.color
        c.fill()
      }
    }

    const colorArray = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF']
    const myCircle = new Circle(30, 80, 10)
    let circleArray = []

    for (let i = 0; i < 800; i++) {
      const randomXCoordinate = Math.random() * canvasWidth
      const randomYCoordinate = Math.random() * canvasHeight
      const randomRadius = Math.random() * 5
      circleArray.push(
        new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
      )
    }

    function updateAll () {
      c.clearRect(0, 0, canvasWidth, canvasHeight)
      myCircle.update()
      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
      }
      window.requestAnimationFrame(updateAll)
    }

    updateAll()
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className='Register'>
        <canvas id='myCanvas' />
        <form
          className='RegisterForm'
          onSubmit={handleSubmit(this.onSubmit)}
          style={{ width: '400px', padding: '20px' }}
        >
          <Link
            style={{ textDecoration: 'none !important', color: '#111' }}
            to='/'
          >
            <h1>Lambda Notes</h1>
          </Link>
          <h2>Register:</h2>
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
          <Field
            label='Verify Password'
            name='verify'
            type='password'
            component={this.renderField}
          />
          <button
            style={{ marginLeft: '140px' }}
            type='submit'
            className='btn btn-primary'
          >
            Submit
          </button>
          <h5 style={{ marginTop: '20px' }}>
            {this.state.loading && 'Loading page ... Please Wait.'}
          </h5>
        </form>
      </div>
    )
  }

  onSubmit = user => {
    this.setState({ loading: true })

    axios
      .post(`${serverURL}/api/register`, user)
      .then(response => {
        localStorage.setItem('authorization', `Bearer ${response.data.token}`)
        console.log('in first then')
      })
      .then(x => {
        this.props.fetchNotes()
        console.log('in second then')
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
  const { username, password, verify } = values
  const errors = {}
  if (!username || username.length < 3 || username.length > 20) {
    errors.username = 'Enter a username that is between 3 and 20 characters.'
  }
  if (!password || password.length < 3 || password.length > 20) {
    errors.password = 'Enter a password that is between 3 and 20 characters.'
  }
  if (password !== verify || !verify) {
    errors.verify = 'Passwords do not match!'
  }

  return errors
}

export default reduxForm({ validate, form: 'RegisterForm' })(
  connect(null, { fetchNotes })(Register)
)

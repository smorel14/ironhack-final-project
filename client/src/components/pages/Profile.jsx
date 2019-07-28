import { useForm } from '../../hooks'
import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row, CardImg } from 'reactstrap'
import api from '../../api'

export default function NewStreetArt(props) {
  const [profile, setProfile] = useState(null)
  const { formValues, getInputProps } = useForm()

  useEffect(() => {
    api
      .getProfile()
      .then(profile => {
        setProfile(profile)
      })
      .catch(err => console.log(err))
  }, [])

  if (!profile) return null

  const getFormValue = key =>
    formValues[key] !== undefined ? formValues[key] : profile[key]

  const username = getFormValue('username')
  const email = getFormValue('email')
  const password = getFormValue('password')
  const picture = getFormValue('picture')

  function handleSubmit(event) {
    event.preventDefault()

    const uploadData = new FormData()
    uploadData.append('username', username)
    uploadData.append('email', email)
    uploadData.append('password', password)
    uploadData.append('picture', picture)

    api.editProfile(uploadData).then(profile => {
      console.log(profile)
      props.history.push('/profile')
    })
  }

  return (
    <div>
      <h1>Profile Settings</h1>
      <CardImg
        top
        width="100%"
        style={{
          width: 150,
          height: 150,
          borderRadius: 150 / 2,
          overflow: 'hidden',
          borderWidth: 3,
          borderColor: 'black',
        }}
        src={profile.image}
        alt="profile-img"
      />

      <form onSubmit={handleSubmit}>
        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleUsername">Username: </Label>
          </Col>
          <Col>
            <Input
              type="text"
              {...getInputProps('username')}
              value={username || ''}
            />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Email: </Label>
          </Col>
          <Col>
            <Input
              type="text"
              {...getInputProps('email')}
              value={email || ''}
            />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Password: </Label>
          </Col>
          <Col>
            <Input
              type="password"
              {...getInputProps('password')}
              value={formValues.password || ''}
            />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Picture</Label>
          </Col>
          <Col>
            <Input type="file" {...getInputProps('image')} value={null} />
          </Col>
        </Row>

        <button className="my-4" color="danger" block>
          Edit profile
        </button>
      </form>

      <pre>{JSON.stringify(formValues)}</pre>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import api from '../../api'
// import {
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Button,
//   ListGroup,
//   ListGroupItem,
// } from 'reactstrap'

// export default function Profile() {
//   const [profile, setProfile] = useState(null)

//   useEffect(() => {
//     api
//       .getProfile()
//       .then(profile => {
//         setProfile(profile)
//       })
//       .catch(err => console.log(err))
//   }, [])

//   //needed otherwise it is null! Same as (recipe && recipe...)
//   if (!profile) return null

//   return (
//     <div>
//       <Card>
//         <CardImg top width="100%" src="" alt="profile-img" />
//         <CardBody>
//           <CardTitle>Hello {profile.username}</CardTitle>
//           <CardSubtitle>This is your profile</CardSubtitle>
//           <CardText>
//             <ListGroup>
//               <ListGroupItem>
//                 <strong>Username: </strong>
//                 {profile.username} <br />
//               </ListGroupItem>
//               <ListGroupItem>
//                 <strong>Email: </strong>
//                 {profile.email} <br />
//               </ListGroupItem>
//               <ListGroupItem>
//                 <strong>Password: </strong>
//                 {profile.password} <br />
//               </ListGroupItem>
//             </ListGroup>
//           </CardText>
//           <button className="info info-danger">Edit</button>
//         </CardBody>
//       </Card>
//     </div>
//   )
// }
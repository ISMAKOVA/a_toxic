import React, {useRef, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, Nav, Row, Tab} from "react-bootstrap";
import {Scrollbars} from 'rc-scrollbars';
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import {fetchOneUser, update} from "../http/user_api";
import {Link} from "react-router-dom";

const UserPage = observer(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        let decodedData = jwt_decode(storedToken, {header: true});
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if (expirationDate < current_time) {
            console.log("remove")
            localStorage.removeItem("token");
        }
    }

    useEffect(() => {
        if (storedToken) {
            fetchOneUser(parseInt(jwt_decode(storedToken).id)).then(data => setEmail(data.email))
            fetchOneUser(parseInt(jwt_decode(storedToken).id)).then(data => setUsername(data.username))
        }
    }, [])

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [username, setUsername] = useState(undefined)
    const [file, setFile] = useState(null)
    const fileInput = useRef(null)
    const isSearch = false;
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    const Update = async () => {
        const formData = new FormData()
        formData.append('id', parseInt(jwt_decode(storedToken).id))
        formData.append('email', email)
        formData.append('username', username)
        formData.append('avatar', file)
        formData.append('password', password)
        for (const key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        update(formData).then()
        alert("Данные обновлены");
    }

    return (
        <Container>
            <Tab.Container id="" defaultActiveKey="first">
                <Row className="mt-4">
                    <Col sm={3}>
                        <Nav className="flex-column neo-nav">
                            <Nav.Item className="">
                                <Nav.Link eventKey="first" className="neo-nav-item">Профиль</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="neo-nav-item">Избранное</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Form  encType="multipart/form-data">
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Почта</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className=""
                                                placeholder="Почта"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Имя пользователя</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className="input_style"
                                                placeholder="Имя пользователя"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Аватар</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className="input_style"
                                                placeholder="Выберите файл"
                                                type="file"
                                                onChange={selectFile}
                                                ref={fileInput}
                                                style={{display: 'none'}}
                                            />
                                            <Button className="ml-4" onClick={() => fileInput.current.click()}>
                                                Загрузить аватар
                                            </Button>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Form.Label column sm="2">Пароль</Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                className=""
                                                placeholder="Пароль"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                type="password"
                                            />
                                        </Col>
                                    </Form.Group>


                                    <Button variant="primary" onClick={Update}>
                                        Обновить
                                    </Button>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Card className="small my-4">
                                    <Card.Body>
                                        <Form.Label className="h5">Добавить новое сообщество</Form.Label>
                                        <Form inline className="my-3">
                                            <Form.Control type="text" placeholder="Введите уникальное имя сообщества"
                                                          className=" mr-sm-2" style={{width: "50%"}}/>
                                            <Button className="" type="button">Поиск</Button>

                                            {isSearch ?
                                                <Button className="ml-4" type="button">Добавить</Button> : ""
                                            }
                                        </Form>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Scrollbars style={{width: "auto", height: "44vh"}}>
                                            <p><Link to="#">Группа</Link></p>


                                        </Scrollbars>
                                    </Card.Body>
                                </Card>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
});

export default UserPage;

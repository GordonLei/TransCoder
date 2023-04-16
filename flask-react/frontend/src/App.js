// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import output from './output.txt'

import {
  Col,
  Row,
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;



function App() {
  //  states and hooks
  // eslint-disable-next-line
  const [getMessage, setGetMessage] = useState({});
  const [sourceLang, setSourceLang] = useState("java");
  const [targetLang, setTargetLang] = useState("python");
  const [fileText, setFileText] = useState("")
  const [currFile, setCurrFile] = useState("")
  //
  const props = {
    name: "file",
    //  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    action: "http://localhost:5000/uploadFile",
    body: {
      sourceLang: sourceLang,
      targetLang: targetLang
    },
    headers: {
      authorization: "authorization-text",
      sourceLang: sourceLang,
      targetLang: targetLang
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

          fetch(output)
          .then((r) => r.text())
          .then(text  => {
            console.log(text);
            setFileText(text)
          })  

        setCurrFile(`${info.file.name}`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  //  useEffect
  useEffect(() => {
    axios
      .get("http://localhost:5000/flask/hello")
      .then((response) => {
        console.log("SUCCESS", response);
        setGetMessage(response);
      })
      .catch((error) => {
        console.log(error);
      });
      fetch(output)
      .then((r) => {
        console.log(r)
        return r.text()})
      .then(text  => {
        console.log(text);
        setFileText(text)
      })  
  }, []);
  //  functions
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSourceChange = (value) => {
    setSourceLang(value)
    console.log(`selected ${value}`);
  };

  const handleTargetChange = (value) => {
    setTargetLang(value)
    console.log(`selected ${value}`);
  };

  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(e.target.files[0])
  }


  //

  return (
    <div className="App">
      {/*
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>React + Flask Tutorial</p>
      <div>{getMessage.status === 200 ? 
        <h3>{getMessage.data.message}</h3>
        :
        <h3>LOADING</h3>}</div>
      </header>
    */}

      <Row>
        <Col span={12}>
          
            <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
    
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Select Source Language"
                rules={[
                  { required: true, message: "Please select source language!" },
                ]}
              >
                <Space wrap>
                  <Select
                    defaultValue="Java"
                    style={{
                      width: 120,
                    }}
                    onChange={handleSourceChange}
                    options={[
                      {
                        value: "python",
                        label: "Python",
                      },
                      {
                        value: "cpp",
                        label: "C++",
                      },
                      {
                        value: "java",
                        label: "Java",
                      },
                    ]}
                  />
                </Space>
              </Form.Item>
              {/* */}
              <Form.Item
                label="Select Target Language"
                rules={[
                  { required: true, message: "Please select target language!" },
                ]}
              >
                <Space wrap>
                  <Select
                    defaultValue="Python"
                    style={{
                      width: 120,
                    }}
                    onChange={handleTargetChange}
                    options={[
                      {
                        value: "python",
                        label: "Python",
                      },
                      {
                        value: "cpp",
                        label: "C++",
                      },
                      {
                        value: "java",
                        label: "Java",
                      },
                    ]}
                  />
                </Space>
              </Form.Item>
              {/* */}
              <Form.Item
                label="Input Code"
                rules={[{ required: true, message: "Please input your code!" }]}
              >
                <TextArea
                  placeholder="Autosize height with minimum and maximum number of lines"
                  autoSize={{ minRows: 10, maxRows: 10 }}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
          col-12
        </Col>
        <Col span={12} style={{textAlign: "left"}}>
        <Space >
           <pre>{fileText}</pre>
           </Space>
        
          col-12</Col>
      </Row>
    </div>
  );
}

export default App;

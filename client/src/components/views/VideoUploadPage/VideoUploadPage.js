import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: 'private' },
  { value: 1, label: 'public' },
];

const CatogoryOptions = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
];

function VideoUploadPage() {
  const [Vidoetitle, setVidoetitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState('film & animation');

  const onTitleChange = (e) => {
    setVidoetitle(e.currentTarget.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', files);
    // console.log(files[0]);

    axios.post('/api/video/uploadfiles', formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        // Axios.post('api/video/thumnail', variable).then((response) => {
        //   if (response.data.success) {
        //     console.log('성공');
        //   } else {
        //     alert('썸네일 생성 실패');
        //   }
        // });
        console.log('성공');
      } else {
        alert('비디오 업로드를 실패했습니다.');
      }
    });
  };

  const onSubmit = () => {};

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={onTitleChange} value={Vidoetitle} />
        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />

        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <select onChange={onCategoryChange}>
          {CatogoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={() => {}}>
          submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;

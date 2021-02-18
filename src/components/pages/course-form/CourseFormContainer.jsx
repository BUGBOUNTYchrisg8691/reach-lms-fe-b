import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Space, Button } from 'antd';
import { useParams } from 'react-router-dom';

import { ModuleForm, ModuleCard } from '../module-form';

const StyledSpace = styled(Space)`
  &&& {
    width: 100%;
  }
`;

// CourseFormContainer — No specific parent, props isn't coming down quite yet
export default ({ isWrapped, onSubmit }) => {
  const { id } = useParams();

  useEffect(() => {
    // if params is undefined, we're creating
    console.log(id);
    console.log(id ? `EDIT/${id}` : 'CREATE');
  }, [id]);

  const [form] = Form.useForm();

  const [modalVisible, setModalVisible] = useState(false);

  const showModuleModal = () => setModalVisible(true);
  const hideModuleModal = () => setModalVisible(false);

  const onFinish = values => {
    // we will do something different here once
    // we're ready to hit endpoints!!
    if (isWrapped) {
      onSubmit(form.getFieldsValue());
    }
    console.log({ values });
  };

  const onModuleAdd = newModule => {
    const existingModules = form.getFieldValue('modules') || [];
    form.setFieldsValue({
      modules: [...existingModules, newModule],
    });
    setModalVisible(false);
  };

  return (
    <StyledSpace direction="vertical" align="center">
      <h1>Course Form</h1>
      <Form
        form={form}
        name="courseForm"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="coursename"
          label="Course Name"
          rules={[{ required: true, message: 'Missing Course Name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="coursecode"
          label="Course Code"
          rules={[{ required: true, message: 'Missing Course Code' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="coursedescription"
          label="Course Description"
          rules={[{ required: true, message: 'Missing Course Description' }]}
        >
          <Input.TextArea style={{ resize: 'none' }} rows={2} cols={2} />
        </Form.Item>

        <Form.Item name="modules" label="Module List">
          {// if `formState.modules` both exists & has a length greater than 0,
          form.getFieldValue('modules')?.length > 0 ? (
            // then map through each module in array and return a list of ModuleCards
            form.getFieldValue('modules').map((module, index) => (
              <li key={index} className="module">
                <ModuleCard {...module} />
              </li>
            ))
          ) : (
            // else, we don't have any modules in this course!
            <p>No modules yet!</p>
          )}
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={showModuleModal}>
            Add Module
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ModuleForm
        visible={modalVisible}
        onCancel={hideModuleModal}
        onSubmit={onModuleAdd}
      />
    </StyledSpace>
  );
};

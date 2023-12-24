import React, { useState } from 'react';
import { Form, Radio, Button, Space, List } from 'antd';
import axios from 'axios';

const answerList = []

const QuizComponent = ({ questions, onSubmit }) => {
  const [form] = Form.useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer , setAnswer] = useState({})
  
  
  const handleNext = () => {
    answerList.push(answer)
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  // const handleQuestionSelect = (selectedQuestion) => {
  //   setCurrentQuestion(selectedQuestion);
  // };

  const handleChange = (idQuestion) => (e) =>{
    setAnswer({ id:idQuestion, answer: e.target.value})
  }

  const onFinish = async (values) => {
    // Call Api
    answerList.push(answer)
    console.log(answerList)
    try {
      const res = await axios.post('/result',{
        userId:JSON.parse(localStorage.getItem("user"))?.id,
        answerList
      })
      console.log(res,'res');

    } catch (error) {
      console.log(error,'error');
    }
   
  };

  return (
    <div className='w-full'>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', marginRight: '20px' }}>
          <h3>Questions</h3>
          <List
            bordered
            dataSource={questions}
            renderItem={(item, index) => (
              <List.Item onClick={() => handleQuestionSelect(index)} style={{ cursor: 'pointer' }}>
                {`${index + 1}`}
              </List.Item>
            )}
          />
        </div>
        <div style={{ width: '70%' }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item label={`Q${currentQuestion + 1}: ${questions[currentQuestion]?.text }`} name={`question_${currentQuestion}`}>
              <Radio.Group className='flex flex-col ' onChange={handleChange(questions[currentQuestion]?._id)} >
                {questions[currentQuestion]?.options.map((option, optionIndex) => (
                  <Radio className='p-3' key={optionIndex} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>

            <Space>
              <Button className='bg-blue-500 text-white' onClick={handlePrev} disabled={currentQuestion === 0}>
                Previous
              </Button>
              {
                currentQuestion === questions.length - 1 &&
                <Button className='bg-blue-500 text-white' htmlType="submit" >
                Submit
              </Button>
              }
              <Button className='bg-blue-500 text-white' onClick={handleNext} disabled={currentQuestion === questions.length - 1}>
                Next
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;

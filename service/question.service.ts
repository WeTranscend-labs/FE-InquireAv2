import axios, { AxiosResponse } from 'axios';
import { CreateQuestionData } from './dto/question/question.create';
import { ApiResponse } from './dto/apiReponse';
import { QuestionResponse } from './dto/question/question.response';

const BASE_URL = 'http://localhost:8080/api';

// Hàm gọi API
export async function createQuestion(
  data: CreateQuestionData
): Promise<AxiosResponse<ApiResponse<QuestionResponse>>> {
  try {
    const response = await axios.post<ApiResponse<QuestionResponse>>(
      `${BASE_URL}/questions`, // Ghép base URL với endpoint
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
}

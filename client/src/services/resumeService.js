import api from '../api/axios';

export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('resume', file);

  const res = await api.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return res.data;
};

export const getResumes = async () => {
  const res = await api.get('/resumes');
  return res.data;
};

export const deleteResume = async (id) => {
  const res = await api.delete(`/resumes/${id}`);
  return res.data;
};

import React from 'react';

import * as ActionTypes from '@constants/actionTypes';
import Form from '@components/article/Form';

export default function Create() {
  return <Form action={ActionTypes.Article.CREATE_ARTICLE} />;
}

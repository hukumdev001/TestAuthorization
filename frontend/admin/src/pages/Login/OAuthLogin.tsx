import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import * as ActionTypes from '@constants/actionTypes';
import { useSelector, useDispatch } from 'react-redux';

export default function OAuthLogin() {
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { isAuthenticated, loading } = useSelector(
    (state: any) => state.reducer.auth
  );
  const dispatch = useDispatch();

  const getToken = async (code: string) => {
    try {
      dispatch({
        type: ActionTypes.Auth.OAUTH_LOGIN,
        payload: {
          code: code,
          service: 'github',
        },
      });
    } catch (e) {
      setIsError(true);
    }
  };

  React.useEffect(() => {
    getToken(code || '');
  }, [code]);

  React.useEffect(() => {
    if (isAuthenticated) navigate('/admin/articles');
  }, [isAuthenticated]);

  if (loading) return <div>Loading</div>;

  if (!code || isError) return <div>Error</div>;
  return <div>OAuthLogin</div>;
}

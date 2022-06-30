import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as ActionTypes from '@constants/actionTypes';
import { PrimaryButton, SecondaryButton } from '@components/common/Button';
import TextAreaWysiwyg from '@components/formElements/TextAreaWysiwyg';
import TextField from '@components/formElements/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Article } from '@@types/Article';

function Form({
  edit = false,
  article = null,
  action,
}: {
  edit?: boolean;
  article?: Article | null;
  action: string;
}): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state: any) => state.reducer.article.errors);

  const [slug, setSlug] = React.useState('');

  const hasErrors = (key: string) => {
    return errors[key] ? errors[key] : false;
  };

  const setSlugs = (title: string) => {
    setSlug(title.trim().toLowerCase().replaceAll(' ', '-'));
  };

  React.useEffect(() => {
    dispatch({ type: ActionTypes.Article.SET_ERRORS, payload: [] });
  }, []);

  return (
    <>
      <div className='px-2 w-full '>
        <div className='flex flex-no-wrap items-start'>
          <div className='w-full '>
            <div className='pb-4 px-2'>
              <div className='bg-white rounded shadow '>
                <Formik
                  initialValues={{
                    title: article?.title || '',
                    slug: article?.slug || '',
                    keywords: article?.keywords || '',
                    description: article?.description || '',
                    metaDesc: article?.metaDesc || '',
                    featured_image: article?.featured_image || '',
                  }}
                  onSubmit={(e) => {
                    dispatch({
                      type: action,
                      payload: {
                        _id: edit ? article?._id : '',
                        title: e.title,
                        slug: slug || e.slug,
                        description: e.description,
                        keywords: e.keywords,
                        metaDesc: e.metaDesc,
                        featured_image: e.featured_image,
                      },
                    });
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <div className=' px-7'>
                        <p className='text-xl font-semibold leading-tight text-gray-800'>
                          {edit ? 'Edit' : 'Create'} Article
                        </p>
                        <div className='grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 '>
                          <TextField
                            title='Title'
                            desc='Set a simple and precise title'
                            name='title'
                            value={props.values.title}
                            onChange={(e) => {
                              props.handleChange(e);
                              setSlugs(e.target.value);
                            }}
                            errors={hasErrors('title')}
                          />

                          <TextField
                            title='Slug'
                            desc='Set a SEO Friendly Slug'
                            name='slug'
                            value={slug || props.values.slug}
                            onChange={(e) => {
                              props.handleChange(e);
                              setSlug(e.target.value);
                            }}
                            errors={hasErrors('slug')}
                          />
                          <TextField
                            title='Keywords'
                            name='keywords'
                            desc='Set Meta Keywords for SEO'
                            value={props.values.keywords}
                            onChange={props.handleChange}
                            errors={hasErrors('keywords')}
                          />
                          <TextField
                            title='Meta Description'
                            desc='Meta Description for SEO'
                            name='metaDesc'
                            value={props.values.metaDesc}
                            onChange={props.handleChange}
                            errors={hasErrors('metaDesc')}
                          />

                          <TextField
                            title='Featured Image'
                            desc='URL to the featured image'
                            name='featured_image'
                            value={props.values.featured_image}
                            onChange={props.handleChange}
                            errors={hasErrors('featured_image')}
                          />
                        </div>
                      </div>
                      <TextAreaWysiwyg
                        title='Article Body'
                        desc='Enter product meta description for better understanding'
                        value={props.values.description}
                        setValue={(val) =>
                          props.setFieldValue('description', val)
                        }
                        name='description'
                        errors={hasErrors('description')}
                      />
                      <hr className='h-[1px] bg-gray-100 my-14' />
                      <div className='flex items-center justify-center px-7 lg:justify-end md:justify-end gap-x-4 gap-y-4'>
                        <SecondaryButton
                          title='Cancel'
                          type='button'
                          onClick={() => navigate('/admin/articles')}
                        />
                        <PrimaryButton
                          title={edit ? 'Update' : 'Create'}
                          type='submit'
                          onClick={() => {}}
                        />
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;

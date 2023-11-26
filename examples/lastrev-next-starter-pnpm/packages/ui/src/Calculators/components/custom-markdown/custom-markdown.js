import React from 'react';
import ReactMarkdown from 'react-markdown';
import { markdown } from './custom-markdown.module.scss';

const CustomMarkdown = ({ data }) => <ReactMarkdown className={markdown}>{data}</ReactMarkdown>;

export default CustomMarkdown;

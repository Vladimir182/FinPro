import React from 'react';

interface PageProps {
  component: JSX.Element
  [propName: string]: any;
} 

const Page: React.FC<PageProps> = (props) => {
  return (
    <>
      {props.component}
    </>
  );
}

export default Page;
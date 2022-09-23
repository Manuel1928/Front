import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const LINKS_QUERY = gql`
query{
    links{
      id
      url
      description
    }
}
`
;

const LinkList = () => {
    const { data } = useQuery(LINKS_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.links.map((link) => (
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
      
    </div>
  );
};

export default LinkList;
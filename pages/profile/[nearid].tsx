import React from 'react';
// import { useAppSelector } from '../../hooks';
// import { getNftTokens } from '../../utils';

const Profile: React.FC = () => {
  // const { balance, account_id } = useAppSelector((state) => state.userAccountReducer);
  // const [tokens, setTokens] = useState([]);
  // useEffect(() => {
  // getNftTokens(account_id).then((result) => setTokens(result));
  // }, []);
  return (
    <table>
      <tbody>
        {/* {tokens.map((data, index) => {
          const { description, extra } = data.metadata;
          const { token_id } = data;
          const issued_at = token_id.split(':')[1];
          const image_src = '/' + token_id.split(':')[0] + '.jpg';
          return (
            <tr key={index}>
              <td>
                <img src={image_src} alt={IMAGE_IS_NOT_FOUND} width={40} height={40} />
              </td>
              <td>{description}</td>
              <td>{new Date(Number(issued_at) / 1000000).toLocaleString()}</td>
              <td>{extra}</td>
            </tr>
          );
        })} */}
      </tbody>
    </table>
  );
};

export default Profile;

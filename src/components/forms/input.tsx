import { styled } from 'goober';

/**
 * Form helpers
 */
type InputProps = {
  error?: string;
  newactivity?: boolean;
  active?: boolean;
};

export const Main = styled('div')`
  @media (max-width: 1023px) {
    padding: 12px 4px;
    background-color: #f3f3f3;
  }
  @media (min-width: 1024px) {
    background-color: #f3f3f3;
    padding: 24px;
    margin: 24px 15%;
  }
`;

export const Header = styled('div')`
  margin: 12px;
`;
export const Paragraph = styled('p')`
  font-size: 0.8rem;
  font-family: 'Noto Sans', sans-serif;
`;

export const Title = styled('h1')`
  font-size 1.5rem;
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
`;

export const Form = styled('form')`
  display: block;
`;

export const Input = styled('input')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && 'red'};
  border: ${props => !props.error && 'none'};
  display: block;

  margin-top: 8px;
`;
export const TextArea = styled('textarea')<InputProps>`
  resize: none;
  // padding: 8px 10px;
  // border-color: ${props => props.error && 'red'};
  // border: ${props => !props.error && 'none'};
  // display: block;
  // box-shadow: 0 6px 9px 0px #ccc;
  // margin-top: 8px;
`;

export const Select = styled('select')<InputProps>`
  padding: 8px 10px;
  border-color: ${props => props.error && 'red'};
  border: ${props => !props.error && 'none'};
  box-shadow: 0 6px 9px 0px #ccc;
  margin-top: 8px;
`;
export const Label = styled('label')`
  font-weight: 700;
  font-family: 'Noto Sans', sans-serif;
`;
export const ListLabel = styled('label')`
  padding: 0 8px;
  font-size: 0.9rem;
  font-family: 'Noto Sans', sans-serif;
`;

export const FormItem = styled('div')`
  display: block;
  padding: 12px;
  justify-content center;
  align-items: center;
`;
export const CheckboxItem = styled('div')`
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

export const List = styled('div')`
  display: inline;
`;

export const DisabledOption = styled('option')`
  color: green;
`;

export const Button = styled('button')`
  background-color: #c0bcbc;
  border: none;
  padding: 1em 2em;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 100px;
  cursor: pointer;
`;

export const DFlex = styled('div')`
  display: flex;
`;

export const CardWrapper = styled('div')`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ActivityCard = styled('div')<InputProps>`
  cursor: pointer;
  width: (100/3) %;
  height: 42.5vh;
  background-color: ${props => (props.newactivity ? '#f3f3f3' : 'white')};
  box-shadow: 0 6px 9px 0px #ccc;
  margin: 12px;
  position: relative;
`;

export const ActivityImage = styled('img')`
  width: 90%;
  height: 60%;
  margin: 5%;
  object-fit: cover;
`;

export const CardTextContainer = styled('div')`
  margin: -5% 5%;
  width: 90%;
`;
export const CardIconContainer = styled('div')`
  position: absolute;
  width: 90%;
  right: 5%;
  bottom: 5%;
  justify-content: center;
`;

export const Border = styled('div')`
  width: 50%;
  border-bottom: 3px solid #009af0;
`;

export const CardTitle = styled('h1')`
  font-size: 1.2rem;
  font-family: 'Noto Sans', sans-serif;
  display: inline-block;
`;
export const NewActivityTitle = styled('h1')`
  @media (min-width: 1024px) {
    font-size: 1.2rem;
    font-family: 'Noto Sans', sans-serif;
    margin: 12px;
    color: #7a7a7a;
  }
  @media (max-width: 1023px) {
    display: none;
  }
`;

export const NewActivityCardTextContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddActivityButton = styled('button')`
  @media (max-width: 1023px) {
    cursor: pointer;
    border: none;
    align-items: center;
    background-color: #f3f3f3;
    box-shadow: 0 6px 9px 0px #ccc;
    padding: 0 4px;
  }
  @media (min-width: 1024px) {
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
    box-shadow: 0 6px 9px 0px #ccc;
    position: absolute;
    right: 0;
    padding: 4px 12px;
  }
`;

export const HeaderNavigation = styled('div')`
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
  }
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const NavItem = styled('p')<InputProps>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  font-family: 'Noto Sans', sans-serif;
  margin: 8px 4px;
  padding: 8px;
  background-color: #f3f3f3;
  box-shadow: ${props => (props.active ? '0 6px 9px 0px #ccc' : 'none')};
`;

export const FileUpload = styled('label')`
  background-color: white;
  display: block;
  padding: 6px 12px;
  margin: 24px 0;
  width: 300px;
  box-shadow: 0 6px 9px 0px #ccc;
  cursor: pointer;
  color: grey;
  font-weight: 500;
  font-size: 0.9rem;
  width: 50%;
`;

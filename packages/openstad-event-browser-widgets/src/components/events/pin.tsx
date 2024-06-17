import React from 'react';

type Props = {
  size?: number;
};
export const Pin = ({ size = 32 }: Props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M25.9824 13.472C24.7024 17.12 22.0464 20.928 19.2624 23.584C16.7024 26.016 12.9264 28.192 9.27837 27.616C5.18237 26.976 4.19037 22.336 4.73437 18.848C4.76637 18.464 4.95837 18.112 5.24637 17.856C5.31037 17.504 5.40637 17.152 5.47037 16.832C5.50237 16.736 5.53437 16.672 5.56637 16.576C4.76637 15.712 4.03037 14.816 3.32637 13.888C3.10237 13.632 2.97437 13.312 2.97437 12.96C1.02237 10.88 1.43837 8.064 2.81437 5.76C3.35837 4.832 4.06237 4.032 4.92637 3.424C5.11837 2.272 6.30237 1.568 7.42237 1.344C8.92637 1.12 10.4624 1.408 11.7744 2.208C13.5024 3.2 14.6864 4.832 16.0304 6.24C17.2144 5.44 18.5584 4.896 19.9344 4.608C20.7024 4.48 21.5024 4.576 22.2384 4.896C22.3344 4.896 22.4304 4.928 22.5264 4.96C26.0784 6.176 27.1344 10.112 25.9824 13.472Z"
        fill="#F15A22"
      />
      <path
        d="M29.8539 31.04C27.7099 29.472 25.6299 27.776 23.6779 25.984C22.7179 25.12 21.7899 24.224 20.9259 23.264C20.8619 23.168 20.7659 23.104 20.7019 23.008C20.3179 22.592 19.9019 22.208 19.5179 21.76C19.1659 21.408 19.1659 20.832 19.5179 20.48C20.0299 19.936 20.5099 19.328 20.9259 18.656C21.4379 17.856 22.5899 18.304 22.6539 19.072C22.7499 19.136 22.8139 19.2 22.9099 19.296L29.5339 27.52C29.6939 27.712 29.7579 27.936 29.7579 28.16C30.1739 28.64 30.5579 29.12 30.9739 29.568C31.5819 30.336 30.7499 31.68 29.8539 31.04Z"
        fill="#EFE7D2"
      />
      <path
        d="M29.505 30.112C29.313 30.112 29.121 30.048 28.961 29.92C27.585 28.864 26.177 27.776 24.769 26.656C22.721 25.024 20.769 23.392 18.913 21.76C18.113 22.464 17.249 23.136 16.385 23.744C14.785 24.832 13.025 25.824 11.009 26.112C10.721 26.144 10.433 26.176 10.113 26.176C9.21696 26.176 8.35296 26.016 7.55296 25.664C6.72096 25.312 6.01696 24.768 5.47296 24.064C4.89696 23.232 4.51296 22.272 4.35296 21.248C4.25696 20.768 4.22496 20.288 4.22496 19.808C4.19296 18.528 4.57696 17.28 5.31296 16.224C3.96896 14.624 2.62496 13.024 1.28096 11.424C1.18496 11.328 1.15296 11.2 1.18496 11.072C0.928958 10.528 0.800957 9.952 0.832957 9.376C0.864957 8.416 1.08896 7.456 1.47296 6.592C2.14496 5.184 3.10496 3.936 4.28896 2.912C4.83296 2.4 5.40896 1.952 6.04896 1.568C6.68896 1.184 7.42496 0.895998 8.16096 0.799998C8.38496 0.767998 8.60896 0.767998 8.83296 0.767998C9.92096 0.767998 10.977 1.12 11.809 1.792C11.873 1.792 11.969 1.824 12.001 1.888C13.569 3.072 15.105 4.32 16.577 5.632L16.609 5.6C17.793 4.736 19.233 4.256 20.705 4.224C20.865 4.224 20.993 4.224 21.153 4.256C21.985 4.32 22.785 4.576 23.489 4.992C24.225 5.408 24.801 6.048 25.185 6.784C25.569 7.552 25.761 8.384 25.729 9.216C25.729 9.984 25.633 10.72 25.441 11.456C24.833 13.856 23.777 16.096 22.305 18.048C22.337 18.08 22.337 18.08 22.369 18.112C24.993 21.6 27.617 25.088 30.241 28.608C30.529 28.96 30.497 29.472 30.177 29.824C29.985 30.016 29.761 30.112 29.505 30.112ZM23.009 5.792C22.433 5.44 21.761 5.216 21.057 5.184C20.929 5.184 20.801 5.184 20.673 5.184C19.457 5.216 18.241 5.6 17.249 6.304C17.729 6.72 18.209 7.168 18.657 7.616C18.817 7.744 18.945 7.904 19.105 8.064C19.265 8.256 19.361 8.48 19.425 8.736C19.457 8.832 19.457 8.928 19.457 9.024C19.457 9.312 19.393 9.632 19.265 9.888C17.953 13.568 15.329 16.64 11.873 18.528C11.105 18.976 10.209 19.264 9.31296 19.296C8.89696 19.296 8.48096 19.2 8.09696 19.04C7.48896 18.688 6.94496 18.24 6.52896 17.664L5.92096 16.96C5.40896 17.824 5.12096 18.816 5.15296 19.808C5.15296 20.224 5.18496 20.672 5.24896 21.088C5.37696 21.952 5.69696 22.784 6.17696 23.52C6.62496 24.096 7.20096 24.544 7.87296 24.832C8.57696 25.12 9.31296 25.28 10.081 25.28C10.337 25.28 10.593 25.248 10.849 25.216C12.609 24.992 14.273 24.096 15.809 23.008C17.921 21.6 19.777 19.84 21.313 17.856C22.849 15.904 23.937 13.664 24.545 11.232C24.705 10.56 24.801 9.888 24.801 9.216C24.833 8.512 24.673 7.84 24.353 7.2C24.065 6.624 23.585 6.112 23.009 5.792ZM12.897 3.776C12.897 4 12.865 4.224 12.833 4.416C12.449 6.464 11.457 8.32 9.95296 9.76C8.48096 11.2 6.59296 12.16 4.57696 12.48C4.32096 12.512 4.06496 12.544 3.80896 12.544C3.68096 12.544 3.55296 12.544 3.42496 12.512L7.26496 17.056C7.58496 17.536 8.03296 17.92 8.51296 18.208C8.76896 18.336 9.05696 18.368 9.34496 18.368C10.081 18.304 10.817 18.08 11.457 17.696C14.721 15.936 17.217 13.024 18.465 9.536C18.529 9.344 18.593 9.152 18.593 8.96C18.593 8.928 18.593 8.896 18.593 8.832C18.561 8.736 18.497 8.608 18.433 8.544C18.337 8.416 18.209 8.288 18.081 8.192C16.417 6.688 14.689 5.184 12.897 3.776ZM29.505 29.184L21.729 18.816C21.057 19.648 20.353 20.416 19.585 21.152C21.409 22.72 23.329 24.32 25.345 25.952C26.753 27.072 28.129 28.16 29.505 29.184ZM1.72896 9.408C1.69696 9.984 1.85696 10.56 2.20896 11.008C2.36896 11.2 2.59296 11.36 2.81696 11.456C3.13696 11.584 3.45696 11.648 3.77696 11.616C4.00096 11.616 4.19296 11.584 4.41696 11.552C6.27296 11.264 7.96896 10.368 9.31296 9.056C10.657 7.744 11.585 6.048 11.937 4.224C11.969 4.064 12.001 3.904 12.001 3.744C12.001 3.68 12.001 3.616 12.001 3.552C11.969 3.36 11.873 3.2 11.777 3.04C11.649 2.848 11.489 2.688 11.297 2.56C10.593 2.016 9.72896 1.696 8.83296 1.696C8.64096 1.696 8.48096 1.696 8.28896 1.728C7.64896 1.824 7.04096 2.048 6.49696 2.4C5.92096 2.752 5.37696 3.168 4.89696 3.616C3.80896 4.544 2.94496 5.696 2.30496 6.976C1.95296 7.744 1.76096 8.576 1.72896 9.408Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
  );
};
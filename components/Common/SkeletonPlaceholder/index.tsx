import * as React from 'react';

interface ISekeltonPlaceholderProps {
  style?: any;
  className?: string;
  bgColor?: string;
  pulseColor?: string;
}

const SkeletonPlaceholder: React.SFC<ISekeltonPlaceholderProps> = (porps) => {
  const { bgColor, style, className, children } = porps;

  return (
    <div style={style} className={className}>
      <style jsx>{`
        div {
          animation: pulseAnimation 1.6s ease infinite;
          background-color: #f1f4f5;

          @keyframes pulseAnimation {
            0% { opacity: 1;}
            45% { opacity: .3;}
            100% {opacity: 1;}
          }
        }
      `}
      </style>

      <style jsx>{`
        div {
          ${ bgColor ? `background-color: ${bgColor};` : 'white-space: normal;'}
        }
      `}</style>
      {children}
    </div>
  );
};

export { SkeletonPlaceholder };

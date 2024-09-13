import { FaFileArrowDown } from 'react-icons/fa6';
import { Button } from '../shacdn-ui/Button.components';
import classNames from 'classnames';

interface ViewButtonProps {
  url: string;
  className?: string;
}

export function ViewFileButton({ url, className }: ViewButtonProps) {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Button variant="outline" size="icon" onClick={() => openInNewTab(url)}>
      <FaFileArrowDown
        className={classNames('mx-auto w-7 scale-125', className)}
      />
    </Button>
  );
}

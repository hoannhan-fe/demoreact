import { FaImage } from 'react-icons/fa';
import { Button } from '../shacdn-ui/Button.components';
import classNames from 'classnames';

interface ViewButtonProps {
  url: string;
  className?: string;
}

export function ViewImageButton({ url, className }: ViewButtonProps) {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  return (
    <Button variant="outline" size="icon" onClick={() => openInNewTab(url)}>
      <FaImage className={classNames('mx-auto w-7 scale-150', className)} />
    </Button>
  );
}

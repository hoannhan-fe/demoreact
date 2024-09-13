import { Column } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '../shacdn-ui/DropdownMenu.components';
import { Button } from '../shacdn-ui/Button.components';
import { cn } from '../../utils/common.utils';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>{title}</span>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
}

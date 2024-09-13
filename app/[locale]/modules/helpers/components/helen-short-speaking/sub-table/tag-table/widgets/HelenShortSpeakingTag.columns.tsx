'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../../../../../../../shared/components';

import { IHelenShortSpeakingTag } from '../../../../../types';
import { DeleteHelenShortSpeakingTagDialog } from '../../../dialog/tag';

export const helenShortSpeakingTagColumns: ColumnDef<IHelenShortSpeakingTag>[] =
  [
    {
      accessorKey: 'value',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Value" />
      ),
      cell: ({ row }) => <>{row.getValue('value')}</>,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => <>{row.getValue('title')}</>,
    },
    {
      accessorKey: 'color',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Color" />
      ),
      cell: ({ row }) => <>{row.getValue('color')}</>,
    },
    {
      accessorKey: 'iconUrl',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon URL" />
      ),
      cell: ({ row }) => <>{row.getValue('iconUrl')}</>,
    },
    {
      id: 'action',
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center gap-2 w-full">
          <DeleteHelenShortSpeakingTagDialog id={row.original.id ?? ''} />
        </div>
      ),
    },
  ];

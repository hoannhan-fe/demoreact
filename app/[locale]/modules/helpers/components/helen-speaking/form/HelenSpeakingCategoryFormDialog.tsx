'use client';
import React, { ReactElement, useEffect, useState } from 'react';

import {
  FormControl,
  Input,
  ConfirmButton,
  DialogLayout,
} from '../../../../../shared/components';

import {
  HelenSpeakingCategorySchema,
  useFormHelenSpeakingCategory,
} from '../../../schema';
import { helenSpeakingCategoryDefaultValue } from '../../../constants';

interface HelenSpeakingCategoryFormDialogProps {
  btnLabel: string | ReactElement;
  isLoading: boolean;
  onClickBtn: (value: HelenSpeakingCategorySchema) => void;

  isOpenDialog: boolean;
  toggleDialog: (value: boolean) => void;

  defaultValue?: HelenSpeakingCategorySchema;
  backgroundBtnColor?: string;
}

export const HelenSpeakingCategoryFormDialog = ({
  btnLabel,
  isLoading,
  isOpenDialog,
  onClickBtn,
  toggleDialog,
  defaultValue,
  backgroundBtnColor,
}: HelenSpeakingCategoryFormDialogProps): ReactElement => {
  const [data, setData] = useState<HelenSpeakingCategorySchema>();
  const {
    form: { register, handleSubmit, reset },
    isError,
    getErrorMessage,
  } = useFormHelenSpeakingCategory();

  useEffect(() => {
    reset(data);
    setData(defaultValue ?? helenSpeakingCategoryDefaultValue);
  }, [isOpenDialog]);

  return (
    <DialogLayout
      isOpenDialog={isOpenDialog}
      btnLabel={btnLabel}
      toggleDialog={toggleDialog}
      backgroundBtnColor={backgroundBtnColor}
    >
      <>
        <div className="flex-center-between">
          <h3 className="text-lg font-semibold">{btnLabel}</h3>
        </div>
        <form
          onSubmit={handleSubmit(onClickBtn)}
          className="grid gap-4 lg:gap-x-10"
        >
          <FormControl label="Title" required>
            <Input
              {...register('title')}
              isError={isError('title')}
              errorMessage={getErrorMessage('title')}
            />
          </FormControl>
          <FormControl label="Value" required>
            <Input
              {...register('value')}
              isError={isError('value')}
              errorMessage={getErrorMessage('value')}
            />
          </FormControl>

          <FormControl label="Color" required>
            <Input
              {...register('color')}
              isError={isError('color')}
              errorMessage={getErrorMessage('color')}
            />
          </FormControl>
          <FormControl label="Icon Url" required>
            <Input
              {...register('iconUrl')}
              isError={isError('iconUrl')}
              errorMessage={getErrorMessage('iconUrl')}
            />
          </FormControl>
          <div className="col-span-2">
            <ConfirmButton isLoading={isLoading} />
          </div>
        </form>
      </>
    </DialogLayout>
  );
};

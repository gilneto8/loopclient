import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '@ui/colors/theme-context';
import { Theme } from '@ui/colors/color-types';
import Button from '@ui/components/simple/Button/button';
import { useStoreSelector } from '@logic/shared/store/use-store-selector';
import { loadMap } from '@logic/features/map/map-thunks';
import { loadSidenav } from '@logic/features/sidenav/sidenav-thunks';
import LabelledSelect from '@ui/components/complex/LabelledSelect/labelled-select';
import { keys } from 'lodash';
import themes from '@ui/themes/theme-selection';
import ThemeFactory from '@ui/colors/theme-factory';

type Props = {};

const style = (theme: Theme, isOpen: boolean) =>
  css({
    transition: 'all .3s',
    position: 'fixed',
    left: isOpen ? 0 : -300,
    bottom: 0,
    height: '100px',
    width: 'inherit',
    lineHeight: '50px',
    paddingLeft: 15,
    paddingRight: 45,
    '& > div': {
      lineHeight: '10px',
      width: '270px',
    },
  });

const SidenavFooter: FunctionComponent<Props> = () => {
  const {
    storeDispatch,
    thunkResult: { sidenavThunks },
    selected: isOpen,
  } = useStoreSelector(loadSidenav(), (storeState) => storeState.sidenav?.open);
  const {
    thunkResult: { mapThunks },
    selected: editMode,
  } = useStoreSelector(loadMap(), (storeState) => storeState.map?.editMode);
  const { theme, setTheme } = useContext(ThemeContext);
  return useMemo(() => {
    const switchMode = () => {
      if (editMode) storeDispatch(mapThunks.setViewMode());
      else storeDispatch(mapThunks.setEditMode());
      storeDispatch(mapThunks.unselect());
      storeDispatch(sidenavThunks.clear());
    };

    return (
      <div css={style(theme, isOpen || false)}>
        <Button onClick={switchMode}>{editMode ? 'Set View Mode' : 'Set Edit Mode'}</Button>
        <LabelledSelect
          name={'Theme'}
          selected={theme.name}
          options={keys(themes)}
          onChange={(e) => setTheme(ThemeFactory.getTheme(themes[e.target.value]))}
        />
      </div>
    );
  }, [theme, isOpen, editMode]);
};

export default SidenavFooter;

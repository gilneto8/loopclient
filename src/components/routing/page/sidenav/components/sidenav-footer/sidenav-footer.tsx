import React, { FunctionComponent, useContext, useMemo } from 'react';
import { css } from '@emotion/core';
import { ThemeContext } from '../../../../../ui/colors/theme-context';
import { Theme } from '../../../../../ui/colors/color-types';
import Button from '../../../../../ui/components/simple/Button/button';
import { useStoreSelector } from '../../../../../../logic/shared/store/use-store-selector';
import { loadMap } from '../../../../../../logic/features/map/map-thunks';
import { loadSidenav } from '../../../../../../logic/features/sidenav/sidenav-thunks';

type Props = {};

const style = (theme: Theme, isOpen: boolean) =>
  css({
    width: '100%',
    transition: 'all .3s',
    position: 'fixed',
    left: isOpen ? 0 : -300,
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 45,
    marginBottom: 10,
  });

const SidenavFooter: FunctionComponent<Props> = (props) => {
  const {
    storeDispatch,
    thunkResult: { sidenavThunks },
    selected: isOpen,
  } = useStoreSelector(loadSidenav(), (storeState) => storeState.sidenav?.open);
  const {
    thunkResult: { mapThunks },
    selected: editMode,
  } = useStoreSelector(loadMap(), (storeState) => storeState.map?.editMode);
  const theme = useContext(ThemeContext).theme;
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
      </div>
    );
  }, [theme, isOpen, editMode]);
};

export default SidenavFooter;

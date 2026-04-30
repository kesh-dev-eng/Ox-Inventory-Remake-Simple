import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control">
        <div className="inventory-control-wrapper">
          <input
            className="inventory-control-input"
            type="number"
            defaultValue={itemAmount}
            onChange={inputHandler}
            min={0}
          />
          <button className="inventory-control-button" ref={use}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M80 168C80 145.9 62.1 128 40 128C17.9 128 0 145.9 0 168L0 389.5C0 415 10.1 439.4 28.1 457.4L128 557.3C140 569.3 156.3 576 173.3 576L240 576C266.5 576 288 554.5 288 528L288 449.1C288 419.4 276.2 390.9 255.2 369.9L229.9 344.6L229.9 344.6C222.6 337.3 206.8 321.5 182.7 297.4C170.2 284.9 149.9 284.9 137.4 297.4C124.9 309.9 124.9 330.2 137.4 342.7C161.5 366.8 177.3 382.6 184.6 389.9C195.6 400.9 193.8 419.1 180.9 427.7C171.2 434.2 158.2 432.9 149.9 424.6L98.7 373.5C86.7 361.5 80 345.2 80 328.2L80 168zM560 168L560 328.2C560 345.2 553.3 361.5 541.3 373.5L490.2 424.6C481.9 432.9 468.9 434.2 459.2 427.7C446.3 419.1 444.5 400.8 455.5 389.9C462.8 382.6 478.6 366.8 502.7 342.7C515.2 330.2 515.2 309.9 502.7 297.4C490.2 284.9 469.9 284.9 457.4 297.4C433.3 321.5 417.5 337.3 410.2 344.6L410.2 344.6L384.9 369.9C363.9 390.9 352.1 419.4 352.1 449.1L352.1 528C352.1 554.5 373.6 576 400.1 576L466.8 576C483.8 576 500.1 569.3 512.1 557.3L612 457.4C630 439.4 640.1 415 640.1 389.5L640 168C640 145.9 622.1 128 600 128C577.9 128 560 145.9 560 168z"/></svg>
            {Locale.ui_use || 'Use'}
          </button>
          <button className="inventory-control-button" ref={give}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M498.8 250.5L541.3 208L576 208C593.7 208 608 193.7 608 176L608 112C608 94.3 593.7 80 576 80L255.6 80C226.6 80 198.3 89.3 174.9 106.5L48.3 199.8C30.5 212.9 26.7 237.9 39.8 255.7C52.9 273.5 77.9 277.3 95.7 264.2L215.4 176L328 176C341.3 176 352 186.7 352 200C352 213.3 341.3 224 328 224L256 224C238.3 224 224 238.3 224 256C224 273.7 238.3 288 256 288L408.2 288C442.1 288 474.7 274.5 498.7 250.5zM141.3 389.5L98.7 432L64 432C46.3 432 32 446.3 32 464L32 528C32 545.7 46.3 560 64 560L384.5 560C413.5 560 441.8 550.7 465.2 533.5L591.8 440.2C609.6 427.1 613.4 402.1 600.3 384.3C587.2 366.5 562.2 362.7 544.4 375.8L424.6 464L312 464C298.7 464 288 453.3 288 440C288 426.7 298.7 416 312 416L384 416C401.7 416 416 401.7 416 384C416 366.3 401.7 352 384 352L231.8 352C197.9 352 165.3 365.5 141.3 389.5z"/></svg>
            {Locale.ui_give || 'Give'}
          </button>
          <button className="inventory-control-button" onClick={() => fetchNui('exit')}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>
            {Locale.ui_close || 'Close'}
          </button>
        </div>
      </div>

      <button className="useful-controls-button" onClick={() => setInfoVisible(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 524 524">
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      </button>
    </>
  );
};

export default InventoryControl;

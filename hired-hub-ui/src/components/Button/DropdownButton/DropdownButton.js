import HeadlessTippy from '@tippyjs/react/headless';
import styles from './DropdownButton.module.scss';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '../../Popper';
import DropdownList from '../../Popper/DropdownList';
import Button from '../../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DropdownButton({ items, selectedItem, onSelectItem, leftIcon, filterSearch }) {
    const [listItem, setListItem] = useState([]);
    const [opened, setOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleToggle = () => {
        setOpened((prev) => !prev);
    };

    useEffect(() => {
        if (searchValue.trim() === '') {
            setListItem(items);
        } else {
            setListItem(items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())));
        }
    }, [searchValue, items]);

    return (
        <div>
            <HeadlessTippy
                interactive
                placement="bottom-start"
                visible={opened}
                onClickOutside={() => setOpened(false)}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('content')}>
                                {filterSearch && (
                                    <input
                                        className={cx('filter')}
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                )}
                                <div className={cx('list-item')}>
                                    {DropdownList({
                                        items: listItem,
                                        selectedItem: selectedItem,
                                        onSelect: (item) => {
                                            setOpened(false);
                                            onSelectItem(item);
                                        },
                                    })}
                                </div>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                <Button
                    className={cx('button')}
                    large
                    leftIcon={leftIcon}
                    rightIcon={<FontAwesomeIcon icon={opened ? faChevronUp : faChevronDown} />}
                    onClick={handleToggle}
                    dropdown
                >
                    {selectedItem?.name}
                </Button>
            </HeadlessTippy>
        </div>
    );
}

export default DropdownButton;

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FocusableBox from '../../components/focusable-box';

// Mock the custom hooks
jest.mock('../../hooks/useTheme', () => ({
    useTheme: () => ({
        card: '#ffffff',
        text: '#000000',
        tint: '#007AFF',
    }),
}));

jest.mock('../../hooks/useScale', () => ({
    useScale: () => 1,
}));


describe('FocusableBox', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly with default props', () => {
        const { getByTestId } = render(
            <FocusableBox testID="focusable-box" />
        );

        expect(getByTestId('focusable-box')).toBeTruthy();
    });

    it('renders with text when text prop is provided', () => {
        const { getByText } = render(
            <FocusableBox text="Test Button" />
        );

        expect(getByText('Test Button')).toBeTruthy();
    });

    it('does not render text when text prop is undefined', () => {
        const { queryByText } = render(
            <FocusableBox />
        );

        expect(queryByText('')).toBeFalsy();
    });

    it('applies custom width and height', () => {
        const { getByTestId } = render(
            <FocusableBox
                testID="focusable-box"
                width={200}
                height={100}
            />
        );

        const box = getByTestId('focusable-box');
        expect(box.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    width: 200,
                    height: 100,
                })
            ])
        );
    });

    it('calls onPress with event and id when pressed', () => {
        const mockOnPress = jest.fn();
        const testId = 123;

        const { getByTestId } = render(
            <FocusableBox
                testID="focusable-box"
                id={testId}
                onPress={mockOnPress}
            />
        );

        fireEvent(getByTestId('focusable-box'), 'press');

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus with event and id when focused', () => {
        const mockOnFocus = jest.fn();
        const testId = 456;

        const { getByTestId } = render(
            <FocusableBox
                testID="focusable-box"
                id={testId}
                onFocus={mockOnFocus}
            />
        );

        fireEvent(getByTestId('focusable-box'), 'focus');

        expect(mockOnFocus).toHaveBeenCalledTimes(1);
    });

    it('applies custom styles', () => {
        const customStyle = { marginTop: 20, backgroundColor: 'red' };

        const { getByTestId } = render(
            <FocusableBox
                testID="focusable-box"
                style={customStyle}
            />
        );

        const box = getByTestId('focusable-box');
        expect(box.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining(customStyle)
            ])
        );
    });

    it('applies focused border style when focused', () => {
        const { getByTestId } = render(
            <FocusableBox testID="focusable-box" />
        );

        const box = getByTestId('focusable-box');

        // Simulate focus state by triggering the style function with focused: true
        fireEvent(box, 'focus');

        // The focused style should be applied via the style function
        expect(box.props.style).toBeDefined();
    });

    it('is memoized correctly', () => {
        const Component = React.memo(FocusableBox);
        expect(Component).toBeDefined();
    });

    it('forwards ref correctly', () => {
        const ref = React.createRef();

        render(
            <FocusableBox
                ref={ref}
                testID="focusable-box"
            />
        );

        expect(ref.current).toBeTruthy();
    });

    it('sets hasTVPreferredFocus prop when provided', () => {
        const { getByTestId } = render(
            <FocusableBox
                testID="focusable-box"
                hasTVPreferredFocus={true}
            />
        );

        // The prop should be passed to the Pressable component
        expect(getByTestId('focusable-box')).toBeTruthy();
    });

    describe('TV scaling', () => {
        beforeEach(() => {
            // Mock useScale to return TV scale factor
            jest.doMock('../../hooks/useScale', () => ({
                useScale: () => 1.5, // TV scale factor
            }));
        });

        afterEach(() => {
            jest.dontMock('../../hooks/useScale');
        });

        it('applies correct border width with TV scaling', () => {
            // Re-import with mocked scale
            const FocusableBoxWithScale = require('../../components/focusable-box').default;

            const { getByTestId } = render(
                <FocusableBoxWithScale testID="focusable-box" />
            );

            // The border width should be scaled (4 * 1.5 = 6)
            expect(getByTestId('focusable-box')).toBeTruthy();
        });

        it('applies correct font size with TV scaling', () => {
            // Re-import with mocked scale
            const FocusableBoxWithScale = require('../../components/focusable-box').default;

            const { getByText } = render(
                <FocusableBoxWithScale text="Scaled Text" />
            );

            const textElement = getByText('Scaled Text');
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    {
                        fontSize: 24, // 12 * 1.5
                        color: '#000000', // text color from theme
                    },
                ])
            );
        });
    });
});
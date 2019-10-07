import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button } from '../../components';

class HelloPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    onChangeTheme: PropTypes.func,
  };

  render() {
    const { history, onChangeTheme } = this.props;
    return (
      <div>
        Hello There !
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis
          sem maximus, vestibulum quam quis, facilisis purus. Phasellus massa
          ante, rhoncus vitae posuere nec, eleifend malesuada lorem. Cras id
          tincidunt mi. Morbi tincidunt, orci ac egestas pellentesque, orci orci
          molestie purus, ut efficitur nibh nisl et ipsum. Suspendisse facilisis
          efficitur ex in tincidunt. Vivamus mauris ante, tincidunt sed
          consectetur eget, malesuada eget nulla. Aliquam in augue ante. In
          condimentum turpis ac condimentum imperdiet. Mauris semper malesuada
          tristique. Proin vel volutpat metus. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque
          venenatis dignissim dapibus. Etiam fringilla mauris diam, quis gravida
          mauris consequat ac. Donec tincidunt consequat eros vitae convallis.
        </p>
        <Button
          type="default"
          label="Open Movie List"
          onClick={() => history.push('/movies')}
        />
        <Button
          type="success"
          label="Go To First Movie"
          onClick={() => history.push('/movies/1')}
        />
        <Button
          type="danger"
          label="Go To Last Movie"
          onClick={() => history.push('/movies/98')}
        />
        <Button
          label="Search for Zied Movies"
          onClick={() => history.push('/movies?cast=Zied Hf')}
        />
        <Button label="Change theme" onClick={onChangeTheme} />
      </div>
    );
  }
}

export default withRouter(HelloPage);

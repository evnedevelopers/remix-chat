export const styles = {
  root: {
    maxWidth: '640px',
    margin: '0 auto',
    gap: 16,
    fontFamily: '"Roboto", sans-serif',
  },
  header: {
    fontFamily: '"Roboto", sans-serif',
    textAlign: 'center' as never,
  },
  messagesContainer: {
    display: 'flex',
    gap: 16,
    flexDirection: 'column' as never,
    background: "#282c34",
    color: "#61dafb",
    borderRadius: 16,
  },
  messagesList: {
    display: 'flex',
    flexDirection: 'column' as never,
    justifyContent: 'flex-end',
    maxHeight: '480px',
    height: '100vh',
    padding: 16,
    overflowY: 'auto' as never,
    gap: 16,
  },
  messageItem: {
    maxWidth: '90%',
    width: 'fit-content',
    minWidth: 100,
    position: 'relative' as never,
    borderRadius: 16,
    padding: 8,
    background: 'rgba(255, 255, 255, 0.2)',
  },
  selfCreatedMessage:{
    marginLeft: 'auto',
  },
  text: {
    fontSize: 14,
    padding: '8px 0'
  },
  author: {
    top: 4,
    left: 8,
  },
  time: {
    bottom: 4,
    left: 8,
  },
  additionalText: {
    position: 'absolute' as never,
    fontSize: 10,
    fontWeight: 300,
  },
  textarea: {
    width: '100%',
    padding: 16,
    backgroundColor: 'inherit',
    color: 'inherit',
    border: '0',
    borderTop: '1px solid',
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    resize: 'none' as never,
  },
  logout: {
    maxWidth: '100%',
    width: 'fit-content',
    display: 'block',
    padding: 16,
    borderRadius: 16,
    margin: '0 auto',
    textDecoration: 'none',
  }
}
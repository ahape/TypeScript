namespace Foo.Bar.Quux {
  export const x = Foo.Bar.Baz.fooBar;
  Foo.Bar.Baz.fooBar();

  const obj = {
    inner: {
      fn: () => 1,
    }
  };

  // How do distinguish this... (object dotting)
  obj.inner.fn();
  // from this? (namespace dotting)
  Foo.Bar.Baz.fooBar();
}

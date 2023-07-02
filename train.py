import os
import tensorflow as tf

assert tf.__version__.startswith('2')

from mediapipe_model_maker import gesture_recognizer

import matplotlib.pyplot as plt

dataset_path = "trainingset"


def show_dataset(num_examples: int = 5):
    print(dataset_path)
    labels = []
    for i in os.listdir(dataset_path):
        if os.path.isdir(os.path.join(dataset_path, i)):
            labels.append(i)
    print(labels)

    for label in labels:
        label_dir = os.path.join(dataset_path, label)
        imgs = os.listdir(label_dir)
        example_filenames = imgs[:num_examples]
        fig, axs = plt.subplots(1, num_examples, figsize=(10, 2))
        for i in range(num_examples):
            axs[i].imshow(plt.imread(os.path.join(label_dir, example_filenames[i])))
            axs[i].get_xaxis().set_visible(False)
            axs[i].get_yaxis().set_visible(False)
        fig.suptitle(f'Showing {num_examples} examples for {label}, n={len(imgs)}')

    plt.show()


def load_and_train():
    data = gesture_recognizer.Dataset.from_folder(
        dirname=dataset_path,
        hparams=gesture_recognizer.HandDataPreprocessingParams()
    )
    train_data, rest_data = data.split(0.8)
    validation_data, test_data = rest_data.split(0.5)

    hparams = gesture_recognizer.HParams(export_dir="exported_model")
    options = gesture_recognizer.GestureRecognizerOptions(hparams=hparams)
    model = gesture_recognizer.GestureRecognizer.create(
        train_data=train_data,
        validation_data=validation_data,
        options=options
    )

    loss, acc = model.evaluate(test_data, batch_size=1)
    print(f"Test loss:{loss}, Test accuracy:{acc}")
    model.export_model()


if __name__ == '__main__':
    show_dataset()
    load_and_train()

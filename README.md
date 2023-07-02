# Browser-based gesture control

Control a website using your webcam and hands!

## Train

Add your training photos to the `trainingset` folder, each gesture is a separate folder:

```text
/.
└── trainingset
    ├── paper
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── ...
    ├── rock
    │   ├── 1.jpg
    │   ├── 2.jpg
    │   └── ...
    └── ...
        ├── 1.jpg
        ├── 2.jpg
        └── ...
```

Now train the model with `python train.py`. The result will be in `/exported_model/gesture_recognizer.task`.

```text
Model: "model"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 hand_embedding (InputLayer)  [(None, 128)]            0         
                                                                 
 batch_normalization (BatchN  (None, 128)              512       
 ormalization)                                                   
                                                                 
 re_lu (ReLU)                (None, 128)               0         
                                                                 
 dropout (Dropout)           (None, 128)               0         
                                                                 
 custom_gesture_recognizer_o  (None, 4)                516       
 ut (Dense)                                                      
                                                                 
=================================================================
Total params: 1,028
Trainable params: 772
Non-trainable params: 256
_________________________________________________________________
None
Resuming from exported_model/epoch_models/model-0010
Epoch 1/10
189/189 [==============================] - 4s 16ms/step - loss: 0.4835 - categorical_accuracy: 0.6429 - val_loss: 0.1373 - val_categorical_accuracy: 0.8723 - lr: 0.0010
Epoch 2/10
189/189 [==============================] - 2s 11ms/step - loss: 0.4848 - categorical_accuracy: 0.6508 - val_loss: 0.1288 - val_categorical_accuracy: 0.8723 - lr: 9.9000e-04
Epoch 3/10
189/189 [==============================] - 2s 11ms/step - loss: 0.4681 - categorical_accuracy: 0.6561 - val_loss: 0.1409 - val_categorical_accuracy: 0.8511 - lr: 9.8010e-04
Epoch 4/10
189/189 [==============================] - 2s 12ms/step - loss: 0.4515 - categorical_accuracy: 0.6508 - val_loss: 0.1475 - val_categorical_accuracy: 0.8511 - lr: 9.7030e-04
Epoch 5/10
189/189 [==============================] - 2s 13ms/step - loss: 0.4433 - categorical_accuracy: 0.6720 - val_loss: 0.1452 - val_categorical_accuracy: 0.8511 - lr: 9.6060e-04
Epoch 6/10
189/189 [==============================] - 2s 13ms/step - loss: 0.4381 - categorical_accuracy: 0.6825 - val_loss: 0.1501 - val_categorical_accuracy: 0.8511 - lr: 9.5099e-04
Epoch 7/10
189/189 [==============================] - 3s 14ms/step - loss: 0.4317 - categorical_accuracy: 0.6878 - val_loss: 0.1427 - val_categorical_accuracy: 0.8511 - lr: 9.4148e-04
Epoch 8/10
189/189 [==============================] - 2s 12ms/step - loss: 0.4309 - categorical_accuracy: 0.6825 - val_loss: 0.1416 - val_categorical_accuracy: 0.8511 - lr: 9.3207e-04
Epoch 9/10
189/189 [==============================] - 2s 12ms/step - loss: 0.4214 - categorical_accuracy: 0.6693 - val_loss: 0.1534 - val_categorical_accuracy: 0.8511 - lr: 9.2274e-04
Epoch 10/10
189/189 [==============================] - 2s 12ms/step - loss: 0.4169 - categorical_accuracy: 0.6720 - val_loss: 0.1540 - val_categorical_accuracy: 0.8511 - lr: 9.1352e-04
48/48 [==============================] - 1s 2ms/step - loss: 0.1905 - categorical_accuracy: 0.8333
Test loss:0.19054387509822845, Test accuracy:0.8333333134651184
```
## Frontend

Afterward you can build the frontend:

```shell
cd web
npm run link
npm run build
npm run preview
```

The resulting bundle will be in `/web/dist/`.